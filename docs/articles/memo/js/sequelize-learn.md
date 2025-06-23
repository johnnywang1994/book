# Sequelize 筆記

## 基本使用
建議透過 `sequelize-cli` 快速搭建環境配置，以及構建完整 models, migrations 環境

以 Koa 舉例，安裝如下
```bash
$ npm install sequelize sequelize-cli sqlite3 koa koa-body @koa/router
```

## 初始化
```bash
$ npx sequelize init
```

## 創建 model
```bash
$ npx sequelize model:generate --name office --attributes name:string
$ npx sequelize model:generate --name lesson --attributes name:string
$ npx sequelize model:generate --name teacher --attributes name:string, officeId:integer
$ npx sequelize model:generate --name teacher_lesson --attributes lessonId:integer,teacherId:integer
```

## 修改 migration
- [參考文章](https://siddharth-lakhara.medium.com/understanding-sequelize-associations-part-3-many-to-many-n-m-mapping-3e7dcdeb78db)

1. `teacher` 1 to many relation
修改 teacher 的 migration file 加上 references
```js
'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', {
      // ...
      officeId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'offices', // need to be pluralized in migration
          key: 'id',
        },
      },
      // ...
    });
  },
  // ...
};
```

2. `teacher_lesson` M to N relation
修改 teacher_lesson 的 migration file 加上 references
```js
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teacher_lessons', {
      // ...
      lessonId: {
        type: Sequelize.STRING,
        references: {
          model: 'lessons', // need to be pluralized in migration
          key: 'id'
        }
      },
      teacherId: {
        type: Sequelize.STRING,
        references: {
          model: 'teachers', // need to be pluralized in migration
          key: 'id'
        }
      },
      // ...
    });
  },
  // ...
};
```

## 添加 model relations
model relation 關係按照以下方式判讀
- [v6 associations](https://sequelize.org/docs/v6/core-concepts/assocs/)
- [v5 associations](https://sequelize.org/v5/manual/associations.html)

1. `A.belongsTo(B)`
```js
// A 屬於 B
A.belongsTo(B, {
  foreignKey: 'B_Id', // 在 A 上添加 B 的 foreignKey
})
```

2. `A.belongsToMany(B)`
以下為預設的 belongsToMany 行為，會自動添加兩方的 id 為 foreignKey
```js
// A 屬於多個 B
A.belongsToMany(B, {
  through: 'A_B',
  foreignKey: 'A_Id', // 在 A_B 上添加 source A 的 foreignKey
  otherKey: 'B_Id', // 在 A_B 上添加 target B 的 foreignKey
})
```

3. `A.hasOne(B), A.hasMany(B)`
因為 A, B 關係是成對存在，建議以一種方式添加 foreignKey 即可，例如 belongsTo 已經添加，則對應的 hasOne 或 hasMany 就可以省略
```js
// A 擁有多個 B
A.hasMany(B, {
  foreignKey: 'B_Id', // 在 B 上添加 A 的 foreignKey
})
```

## 按照上述規則添加 model relations
```js
// office model
// foreignKey 在 teacher 的 belongsTo 添加
office.hasMany(models.teacher);
```

```js
// lesson model
lesson.belongsToMany(models.teacher, {
  through: models.teacher_lesson,
  foreignKey: 'lessonId',
})
```

```js
// teacher model
teacher.belongsTo(models.office, {
  foreignKey: 'officeId',
})

teacher.belongsToMany(models.lesson, {
  through: models.teacher_lesson,
  foreignKey: 'teacherId',
})
```

```js
// teacher_lesson model
teacher_lesson.belongsTo(models.lesson, {
  foreignKey: 'lessonId',
});
teacher_lesson.belongsTo(models.teacher, {
  foreignKey: 'teacherId',
});
```

## 更新 config.json 配置
```json
{
  "development": {
    "storage": "./db.sqlite",
    "dialect": "sqlite"
  }
}
```

## migrate models
```bash
$ npx sequelize db:migrate
```

## 建立 koa server
```js
const Koa = require('koa');
const KoaRouter = require('@koa/router');
const koaBody = require('koa-body');

const app = new Koa();
const router = new KoaRouter({ prefix: '/api' });

router.get('/', (ctx) => {
  ctx.body = 'welcome';
})

// ... apis

app.use(koaBody());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8000, () => console.log('server listen 8000'));
```

## db manager 筆記
1. createTeacherLesson
建立一筆 中間表 的紀錄
```js
const createTeacherLesson = async (lessonId, teacherId) => {
  const result = await models.teacher_lesson.create({
    lessonId,
    teacherId,
  })
  return result;
};
```

2. getTLsByTeacher
拿取指定 teacher 並包含其所有 lessons
```js
const getTLsByTeacher = async (teacherId) => {
  const result = await models.teacher.findAll({
    where: { id: teacherId },
    include: {
      model: models.lesson,
      // exclude associate select
      // https://stackoverflow.com/questions/30082625/cant-exclude-associations-fields-from-select-statement-in-sequelize
      through: {
        attributes: []
      }
    },
  });
  return result;
};
```

## Reference
- [Koa Sequelize](https://github.com/jwlearn1994/koa-sequelize.git)