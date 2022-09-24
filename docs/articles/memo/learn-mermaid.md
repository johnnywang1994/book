# Mermaid 學習筆記

每一種圖的語法都不太一樣，請先確認需要的圖再進行撰寫


## Flowchart
- [Link](https://mermaid-js.github.io/mermaid/#/flowchart)
```mermaid
flowchart TD
    Entry[入口] --> checkMoney{檢查餘額}
    checkMoney --> |Money >= 100| Success[成功]
    checkMoney --> |Money < 100| Failed[失敗]
```

## Requirement Diagram
- [Link](https://mermaid-js.github.io/mermaid/#/requirementDiagram)
```
requirementDiagram

requirement MainPage {
    id: mainpage
    text: "主要活動頁面"
    risk: High
    verifymethod: Inspection
}

requirement SorryPage {
    id: sorrypage
    text: "錯誤頁面"
    risk: High
    verifymethod: Inspection
}

functionalRequirement CheckEventTime {
    id: check event time
    text: "檢查活動時間"
    risk: High
    verifymethod: Test
}

element EventTime {
    type: DateFormat
    docref: "define/eventtime"
}

MainPage - contains -> CheckEventTime
CheckEventTime - verifies -> EventTime
CheckEventTime - derives -> SorryPage
```

## Class Diagram
- [Link](https://mermaid-js.github.io/mermaid/#/classDiagram)
```mermaid
classDiagram
class Animal {
    +String name
    +Number age
    +run() void
}

class Dog {
    +bite()
}

class Zoo {
    +List~Animal~ animals
    +add(newAnimal) void
    +remove(targetAnimal) void
}

%% Dog 繼承 Animal
Dog --|> Animal
%% Zoo 依賴 Animal
Zoo ..> Animal
```

## PieChart
- [Link](https://mermaid-js.github.io/mermaid/#/pie)
```mermaid
pie title WeeklyReport
    "LINE Invoice" : 80
    "Sticker Campaign" : 5
    "SbE Workshop" : 15
```