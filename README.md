# todolist_project
todolist-javascript專案練習
![image](https://github.com/alan19951024/todolist_project/assets/59355302/b6d82ec4-feb1-4b99-aa58-8883bcfb823d)

** 0804更新
1. addDo() 時避免使用者輸入空白鍵送出，可以利用 text.value.trim() 語法來和空字串比對，如果為 True 代表使用者輸入空白鍵作為資料，這時候就不要做 addDo()，可以跳出訊息提示使用者！
2.在輸入資料時可以加上 trim() 語法，將使用者輸入有前後空白的資料移除空白，效果會像是 " 洗衣服 " → "洗衣服"。
3.當 todoCount 和 doCount 為 0 時，可以顯示 "目前沒有待完成事項" 和 "目前沒有已完成項目" 來取代 " 0 個待完成事項" 和 " 0 個已完成項目"。
4.新增完待辦項目時可以將頁籤切回全部，避免 list 渲染完了頁籤卻還在別的地方，可能會誤導使用者，也同時讓使用者可以看到目前全部已新增的項目哦！
