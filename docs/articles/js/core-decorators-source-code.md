# Core Decorators Source code 深入理解實現

Hi 大家好，我是 Johnny，今天要帶大家來看一個相對於 functional 而言較為沒這麼為人所知的東西-decorator，中文名叫裝飾器

- 在寫入 descriptor 前必須確保在此之前的其他 decorator getter 已經完成觸發調用，否則當前 defineProperty 執行後，會被前面的其他 decorator getter 執行時覆蓋掉導致當前 decorator 不會執行
