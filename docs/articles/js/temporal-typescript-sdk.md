# Temporal Typescript SDK 學習筆記

<SocialBlock hashtags="javascript,typescript,temporal,message quene,nodejs" />

Hi 大家好，這篇是紀錄學習基礎 Temporal Typescript SDK 的介紹與筆記(Temporal 支援多種語言使用)，旨在快速學習與上手理解，雖然整理完文章還是很長 XDDDDD（學到崩潰

詳細介紹建議查看官方文件會更清楚喔，本篇是個人閱讀與前輩指點整理而成，感謝前輩指點迷津帶我飛～


## Temporal 是什麼？
Temporal 是一個分布式、易擴展、持久且高度可用的工作編排引擎（`workflow engine`），用統一的 API 替許多日常的定時工作、排期工作進行編排自動化的長時間運行業務邏輯（比如訂閱扣款、爬蟲資料刷新等等）。

其中以五個概念為核心： `Task`, `Activity`, `Workflow`, `Worker`, `Client`


## Task
temporal 中的 taskQuene 中包含兩個 quene，`workflowTaskQuene`, `activityTaskQuene`，兩者分別存放對應的 task，所以 task 也分為 `workflowTask`, `activityTask`，兩者的區別後續會提到，這邊可以先大概有個概念，詳細可參考官方的圖如下

- [Temporal Task](https://docs.temporal.io/tasks/)
![](https://docs.temporal.io/assets/images/task-queue-3ae3eb770a166dbd709455a8a2dd6748.svg)


## Activity
一個包含程式執行環境的`活動`功能，通常為實際執行程式邏輯，處理的動作比起 workflow 較為單一，activity 在實際被 workflow 使用時會透過 `proxyActivities` 包裹，才會真正被定義 taskQuene

```ts
export async function greet(name: string): Promise<string> {
  return `Hello, ${name}!`;
}
```


## Workflow
一個 Workflow 是由開發者定義的 Temporal 內部最小執行單元，包含一段無副作用的執行過程，每個 `workflow execution` 都擁有一個本地狀態，並獨佔訪問權，其他 workflow 無法直接訪問，workflow 彼此間以 `並行` 的方式執行，互不影響，若 workflow 彼此需要溝通可以透過 `傳遞 signal` 的方式進行

workflow 是一個可重入的過程，包含可恢復、反應式，不論設定多久，或是系統故障，將會自動重啟並重試
- `可恢復`：指 process 在因執行失敗，或者因執行等待而暫停後，可以繼續執行的能力
- `反應式`：指 process 可以對外部事件作出反應的能力

### 在 workflow 中取得 workflowInfo
呼叫 `workflowInfo` 可以取得當前 workflow 的資訊，比如 workflowId
```ts
import { workflowInfo } from '@temporalio/workflow'

export async function example(name: string): Promise<string> {
  const { workflowId } = workflowInfo()
  return await greet(name);
}
```

### 在 workflow 中呼叫 activity
在 workflow 中的環境不是程式環境(此為nodejs)，而是一個特殊執行環境，故 activity 方法需透過 `proxyActivities` 解構之後才能使用，名稱與原來的方法相同

```ts
// workflows.ts
// 此為 temporal workflow 執行環境
// 執行流程看似一般程式，但其實背後 temporal 會將不同 task 分發出去給 workers 執行
// 這裏僅算是一個 workflow 工作流程的定義區
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30s',
  // 這邊可以定義被 proxy 的 activity 實際會觸發什麼 taskQuene
  // 讓對應監聽的 worker 去處理這個 activiyTask
  // 預設情況下會觸發 `default` worker
  // taskQuene: 'default'
});

/** A workflow that simply calls an activity */
export async function example(name: string): Promise<string> {
  return await greet(name);
}
```

### 在 workflow 中呼叫 child workflow
如果需要在當前 workflow 中調用另一個子 workflow，可以使用兩個方法
- `executeChild`: 可回傳 promise await 等子 workflowTask 執行完（推薦）
- `startChild`: 丟一個 child workflowTask 執行出去後就不管他

```ts
// workflows.ts
import { executeChild, proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet } = proxyActivities<typeof activities>({
  startToCloseTimeout: '30s'
});

export async function childExample({ msg }) {
  return `Johnny is ${msg}`
}

export async function example(): Promise<string> {
  const name = await executeChild(childExample, {
    args: [{ msg: 'very well' }],
    workflowId: `child-example-${Date.now()}`,
    // taskQueue: 'default', // 這裡也可以指定 taskQuene
  })
  return await greet(name);
}
```


## Worker
worker 是 temporal 裡面實際執行 task 的 `工作者`，每個 worker 會指定監聽的 taskQuene 目標，每當監聽的 quene 新增 task 時就會主動去 `poll` task 來執行

### 建立 Worker
建立時綁定每個 worker 對應可以使用的 `activities`, `workflowsPath`，但 worker 不一定要綁定 workflow，可以只綁定 activities，並在其他 workflow 中呼叫時透過 `taskQuene` 指定讓某個特定處理 activities 的 worker 處理
```js
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

const workers = []

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./workflows'),
    activities,
    taskQueue: 'default',
  });
  workers.push(worker)

  const activitiesWorker = await Worker.create({
    activities,
    taskQuene: 'hello-world' // proxyActivities 時指定為 hello-world，這個 worker 就會去處理～
  });
  workers.push(worker)

  await Promise.all(workers)
}

run().catch((err) => {
  console.error(err);
  workers.forEach((w) => w.shutdown());
  process.exit(1);
});
```


## Client
client 是提供用戶端開發時進行調用 workflow task 的主要途徑，也可以透過 command line 進行調用

> 前提是你的 temporal server 已經啟動就緒

### Programming
建立新的 temporal workflow client 實例
```js
// client.ts
import { Workflow } from '@temporalio/workflow';
import { Connection, WorkflowClient } from '@temporalio/client';

let client: WorkflowClient;

export async function getClient() {
  if (!client) {
    const connection = await Connection.connect({
      // Connect to localhost with default ConnectionOptions.
      // In production, pass options to the Connection constructor to configure TLS and other settings:
      // address: 'foo.bar.tmprl.cloud', // as provisioned
      // tls: {} // as provisioned
    });

    client = new WorkflowClient({
      connection,
      namespace: 'default', // change if you have a different namespace
    });
  }

  return client;
}
```
透過 `client` 物件調用執行 workflow
```js
import { getClient } from './client'
import { example } from './workflows'

async function run() {
  const client = await getClient();
  const handle = await client.start(example, {
    args: ['Temporal'], // 參數傳遞給 example workflow
    taskQueue: 'hello-world', // 加入的 taskQuene 名稱，對應 worker 必須能處理此 workflow
    workflowId: 'example-workflow-id',
    // workflow id reuse policy 參考結尾列表
    workflowIdReusePolicy: WorkflowIdReusePolicy.WORKFLOW_ID_REUSE_POLICY_REJECT_DUPLICATE,
    // retry policy
    retry: {
      maximumAttempts: 20
    }
  })
  const res = await handle.result()
}

run()
```

### Command line
- [How to use tctl?](https://docs.temporal.io/tctl/how-to-use-tctl/)  
可以透過 command line 進行調用 temporal workflow
```bash
# 環境變數設為預設（local）
export TEMPORAL_CLI_ADDRESS=
# 執行 workflow
tctl wf start --tq default -i '[workflow-args]' -w [workflow-id] --wt [workflow-type]
# 取消 workflow
tctl wf cancel -w [workflow-id]
```



## Signals & Querys

這兩者都是用在與 `workflow` 進行溝通傳遞訊息用，但有些微區別
- [Signals](https://docs.temporal.io/workflows/#signals)  
  setHandle 僅可以在 workflow 執行特定動作，無法返回狀態
- [Querys](https://docs.temporal.io/workflows/#queries)  
  setHandle 可以返回 workflow 內部狀態

### Signals 範例
以下範例為一個訂閱機制 workflow
```js
// workflows.ts
import { defineSignal, setHandler, sleep } from '@temporalio/worker'

export const cancelSubscription = defineSignal('cancelSignal'); // new

export async function SubscriptionWorkflow(
  email: string,
  trialPeriod: string | number
) {
  let isCanceled = false; // internal variable to track cancel state

  setHandler(cancelSubscription, () => void (isCanceled = true)); // new

  await acts.sendWelcomeEmail(email);
  await sleep(trialPeriod); // sleep will wait a fixed time
  if (isCanceled) {
    await acts.sendCancellationEmailDuringTrialPeriod(email); // new
  } else {
    await acts.sendSubscriptionOverEmail(email);
  }
}
```

#### - Invoke by Client
```js
// other-client.ts
import { cancelSubscription } from './workflows';
import client from './client';

function signalWorkflow(workflowId, signalName, ...args) {
  const handle = client.getHandle(workflowId);
  await handle.signal(signalName, ...args);
}

signalWorkflow('my-workflow-id', cancelSubscription)
```

#### - Using `condition` with timeouts
`sleep(ms)` 將執行延遲固定時間，`condition` 將執行無限期延遲，直到給定的條件函數判斷返回 `true`，假設有個檢查函數，我們要判斷檢查是否完全執行完畢可以寫成這樣
```js
// workflows.ts
export const childCompletedSignal = defineSignal(childCompletedSignal)

export async function checkDataWorkflow() {
  let completedChildWorkflows = 0;
  let totalChildWorkflows = 0;

  setHandler(childCompletedSignal, () => {
    completedChildWorkflows += 1;
  });

  const { workflowId } = workflowInfo();
  const dataList = await getChildData(); // activity to call rest api to get childData

  const childHandles = dataList.map((data) => {
    return startChild(checkPartialData, {
      args: [{
        parentWorkflowId: workflowId,
        data
      }],
      workflowId: `check-child-${Date.now()}`
    })
  })

  totalChildWorkflows = childHandles.length;

  // 這邊其實可以用 executeChild 搭配 Promise.all 更直覺，但這只是一個示範
  // wait until all child complete
  await condition(() => completedChildWorkflows === totalChildWorkflows)

  return true
}

export async function checkPartialData({
  parentWorkflowId,
  data
}) {
  // check data...
  // send signal to parent by parentWorkflowId
  await signalWorkflow(parentWorkflowId, childCompletedSignal)
}
```
> 甚至還有 `inlineSignal`，詳情可見[Signals官網說明](https://docs.temporal.io/typescript/how-to-use-signals-in-typescript/#declare-your-signals-dynamically)

### Querys 範例
透過 query 取得更新資料 workflow 的更新狀態
```js
export const userInfoStatusQuery = defineQuery('userInfoStatusQuery');

export async function updateUserInfoWorkflow() {
  let completedAt = null

  // return workflow status when being queried
  setHandle(userInfoStatusQuery, () => ({
    completed: !!completedAt,
    completedAt,
  }))

  await updateUserInfo() // activity to update user info

  completedAt = new Date();

  return true; // 即使 workflow completed 後，query 此 workflowId 仍然能取得他的狀態
}
```
### Query by Client
跟 Signals 的處理幾乎相同，差別在可以返回狀態
```js
// other-client.ts
import { userInfoStatusQuery } from './workflows';
import client from './client';

async function queryWorkflow(workflowId, signalName, ...args) {
  const handle = client.getHandle(workflowId);
  return await handle.query(signalName, ...args);
}

queryWorkflow('my-workflow-id', userInfoStatusQuery).then(
  (status) => console.log(status.completedAt)
)
```

### custom useState function
- [Link](https://docs.temporal.io/typescript/workflows#signals-and-queries-design-patterns)

```typescript
import * as wf from '@temporalio/workflow';

function useState<T = any>(name: string, initialValue: T) {
  const signal = wf.defineSignal<[T]>(name);
  const query = wf.defineQuery<T>(name);
  let state: T = initialValue;
  return {
    signal,
    query,
    get value() {
      // need to use closure because function doesn't rerun unlike React Hooks
      return state;
    },
    set value(newVal: T) {
      state = newVal;
    },
  };
}

// usage in Workflow file
const store = useState('your-store', 10);
function YourWorkflow() {
  wf.setHandler(store.signal, (newValue: T) => {
    // console.log('updating', newValue) // optional but useful for debugging
    store.value = newValue;
  });
  wf.setHandler(store.query, () => store.value);
  while (true) {
    console.log('sleeping for ', store.value);
    wf.sleep(store.value++ * 100); // you can mutate the value as well
  }
}

// usage in Client file
await handle.signal(store.signal, 30);
const storeState = handle.query<number>(store.query); // 30
```


## Continue as New
- [continue-as-new](https://docs.temporal.io/workflows/#continue-as-new)
- [large-event-histories](https://docs.temporal.io/java/workflows/#large-event-histories)  
打開 Temporal Web UI 可以看到每個 worker 執行 task 時，左側的編號就是 event 編號，預設最大單一 worker 能夠執行的 events 數量為 50000，超過就必須 renew，建議可以如下面方式以分頁的形式 1000 筆執行一個 `partialWorkflow`，並透過 while loop 判定是否還有剩餘需執行的內容，避免效能崩潰

```js
// workflows.ts
export async function fetchAllData({
  startPage,
  pageSize
}) {
  let hasNextPage = true;
  let page = startPage;

  while (hasNextPage) {
    hasNextPage = await executeChild(fetchPartialData, {
      args: [page, pageSize],
      workflowId: `fetch-partial-${page}`,
    });

    page += 1;
  }

  return true
}

export async function fetchPartialData(
  page = 0,
  pageSize = 1000
) {
  // getUsers could be your activity to call rest api to get users
  const { userIds, pageInfo } = await getUsers(page, pageSize);

  await Promise.all(
    userIds.map(async (userId) => {
      await executeChild(fetchData, {
        args: [userId],
        workflowId: `fetch-user-${userId}`,
      });
    })
  )

  return pageInfo.hasNextPage
}

export async function fetchData(userId) {
  // do something with userId
}
```


## Install Example
Temporal 官方提供了快速搭建整套環境的 example，只需要使用 `npx` 快速就可以快速下載試用

### 下載 example
```bash
$ npx @temporalio/create@latest ./myfolder
```

### 下載 docker-compose 環境配置
獲取最新的 temporal docker-compose 配置檔案，包含不同環境的設定，下載後啟動即可
```bash
$ git clone https://github.com/temporalio/docker-compose.git temporal-server
$ cd temporal-server
$ docker-compose up
```

### Temporal Web UI
Temporal 現在提供兩個 version 的 Web UI，就依照喜好選擇你要看哪個摟～，預設配置裡兩個會同時啟動（未來不知道會不會把 v1 移除）
- [Temporal Web UI v1](http://localhost:8088/): port 8088
- [Temporal Web UI v2](http://localhost:8080/): port 8080


## 其他範例

### 製作 timeout 效果
```js
const wrapTimeout = (targetHandle, maxWaitSeconds = 30) => {
  return Promise.race([
    targetHandle,
    new Promise((r) => setTimeout(r, maxWaitSeconds * 1000)),
  ]);
}

const runWorkflow = async () => {
  const wfHandle = await client.start(myWorkflow, {
    args: [],
    workflowId: 'my-workflow-id'
  });
  // workflow 跑超過 30s 就直接往後不等，避免卡住
  await wrapTimeout(wfHandle.result(), 30)

  const status = await wfHandle.query(checkStatusQuery);
  return status;
};
```

### 獲取 workflow 狀態
Temporal 在 workflow handle 物件中有提供以下方法可以獲得當前指定 workflow 的相關資訊狀態

- [Workflow Handle API methods](https://docs.temporal.io/typescript/clients/#workflow-handle-apis)
- [WorkflowExecutionStatus](https://typescript.temporal.io/api/enums/proto.temporal.api.enums.v1.workflowexecutionstatus/) 使用這個變數會需要先下載 `@temporalio/proto` 這個擴充包喔

下面範例是如何在當前 workflow 中取消自己的範例，例如結束 cronSchedule 的情況，因為 workflow 環境無法使用 client 工具，必須拉出來到 activity 中使用

```ts
// my-activities.ts
import { temporal } from '@temporalio/proto';
import { getClient } from './client';

const { WorkflowExecutionStatus } = temporal.api.enums.v1;

export async function terminateWorkflow(workflowId: string) {
  const client = await getClient();
  const wfHandle = client.getHandle(workflowId);
  // 取得 workflow handle 的當前狀態
  const { status } = await wfHandle.describe();
  // 判斷 code 狀態是否處在 running
  if (status.code === WorkflowExecutionStatus.WORKFLOW_EXECUTION_STATUS_RUNNING) {
    // 終止 cronSchedule，若使用 cancel 只會停止當前的 workflow
    // https://docs.temporal.io/concepts/what-is-a-temporal-cron-job/#how-to-stop-a-temporal-cron-job
    await wfHandle.terminate();
  }
}
```

```ts
// workflow.ts
import { proxyActivities, workflowInfo } from '@temporalio/workflow';
import * as myActivities from './myActivities';

const { terminateWorkflow } = proxyActivities<typeof myActivities>({
  startToCloseTimeout: '30s',
});

export async function TestWorkflow() {
  const { workflowId } = workflowInfo();
  // ...
  await terminateWorkflow(workflowId);
}
```


今天就介紹到這拉，後續如果有其他新的想法也會持續更新紀錄在這，感謝收看，下次再見 =V=

<SocialBlock hashtags="javascript,typescript,temporal,message quene,nodejs" />

## Reference
- [Intro to Temporal with TypeScript SDK + Q&A](https://www.youtube.com/watch?v=66zQ8nrW-mA)
- [Temporal Docs](https://docs.temporal.io/)
- [Temporal Typescript Reference](https://typescript.temporal.io/)
- [What is a Signal](https://docs.temporal.io/concepts/what-is-a-signal/)
- [WorkflowIdReusePolicy](https://typescript.temporal.io/api/enums/client.WorkflowIdReusePolicy)
- [RetryPolicy](https://typescript.temporal.io/api/interfaces/client.workflowoptions/#retry)