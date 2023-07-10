const text = document.querySelector(".text")
const btnAdd = document.querySelector(".btn_add")
const list = document.querySelector(".list")
const tab = document.querySelector(".tab")
const tabs = document.querySelectorAll(".tab li")
JSON.parse(localStorage.getItem('listItem')) || []; //取出存在localStorage裡的資料並轉為陣列型別，如果瀏覽器裡沒存資料則跑空值



// 初始化
let data = JSON.parse(localStorage.getItem('listdata')) || []; //取出存在localStorage裡的資料並轉為陣列型別，如果瀏覽器裡沒存資料則跑空值
console.log(data);
function renderdata(data) {
    let str = ''
    data.forEach(function (item) {
        str += `<li data-num="${item.id}"><label class="checkbox" for="" >
        <input type="checkbox" ${item.complete ? "checked" : ""}/>
        <span>${item.content}</span>
    </label><a href="#" class="delete" ></a> </li>`
    })
    list.innerHTML = str
    console.log(list)
    count()

}


// 新增代辦  False:未完成 true:已完成
btnAdd.addEventListener('click', addDo)
function addDo() {
    if (text.value === '') {
        alert('請輸入代辦事項')
        return
    }

    // 組出data要用到的物件
    let obj = {
        // input 的值
        content: text.value,
        // id 用 getTime() 取毫秒
        id: new Date().getTime(),
        //紀錄待辦事項完成狀態
        complete: false
    };
    data.push(obj)
    text.value = ''
    renderdata(data)
    localStorage.setItem('listdata', JSON.stringify(data)); //轉為字串才可存入localStorage作更新

}

// 點enter新增代辦
text.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        addDo()
    }
})


// 刪除代辦 與更改complete狀態
list.addEventListener("click", function (e) {
    // dataset.id 來獲取 li 元素的 id 屬性值
    let num = parseInt((e.target.closest("li").dataset.num))
    if (e.target.getAttribute("class") === "delete") {
        // 從data篩選出符合的列
        let index = data.filter((item) => item.id === num);
        data.splice(index, 1)
        renderdata(data)
        localStorage.setItem('listdata', JSON.stringify(data)); //轉為字串才可存入localStorage作更新
    } else {
        data.forEach((item) => {
            if (item.id === num) {
                //更改資料是否狀態
                item.complete ? (item.complete = false) : (item.complete = true);

            }
        })
    }
    renderdata(data)

})


// 頁籤更換 css ACTIVE調整
tab.addEventListener('click', function (e) {
    toggleStatus = e.target.dataset.tab;
    // console.log(toggleStatus)
    tabs.forEach(function (item) {
        item.classList.remove('active')
    });
    e.target.classList.add('active')
    updateData()
})

// 預設顯示全部
let toggleStatus = "all";
// 頁籤更換
function updateData() {
    let newData = []
    if (toggleStatus === "all") {
        newData = data
    }
    else if (toggleStatus === "todo") {
        console.log(data)
        newData = data.filter((item) => item.complete === false)

    }
    else {
        newData = data.filter((item) => item.complete === true)
        console.log(data)
    }
    count()
    renderdata(newData)

}

// 計算未完成項目
function count() {
    const todoNum = document.querySelector(".todoNum")
    let todoCount = (data.filter((item) => item.complete === false)).length
    todoNum.innerHTML = `<p class="todoNum">${todoCount}個待完成項目</p>`
    console.log(todoNum)
    console.log(todoCount)
    const doNum = document.querySelector(".doNum")
    let doCount = (data.filter((item) => item.complete === true)).length
    doNum.innerHTML = `<p class="doNum">${doCount}個已完成項目</p>`
    console.log(doNum)
    console.log(doCount)
}

// 清除已完成項目
const cleanAll = document.querySelector(".clean_all")
cleanAll.addEventListener("click", function (e) {
    e.preventDefault()

    unData = data.filter((item) => item.complete === false)
    doData = data.filter((item) => item.complete === true)
    console.log(doData)
    if (doData.length == 0 || doData == "") {
        alert("無任何已完成項目可清除")
    } else {
        confirm(`確定清除所有已完成的待辦事項？`) === true
        data = unData
        updateData(data)
    }
    localStorage.setItem("listdata", JSON.stringify(doData))

})
renderdata(data)

