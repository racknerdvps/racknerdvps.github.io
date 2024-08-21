function render_table(data, tableId='vps')
{
    function createTd(text){
        let td = document.createElement('td');
        td.innerHTML = `<p class="block antialiased font-sans leading-normal text-blue-gray-900 font-normal opacity-70">${text}</p>`;
        return td;
    }
    function createStockTd(stock){
        let td = document.createElement('td');
        if(stock==1){
            //有库存
            td.innerHTML = `<div class="w-full px-2">
            <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-500/20 text-green-900 py-1 px-2 text-xs rounded-md" style="opacity: 1;">
              <span class="">yes</span>
            </div>
          </div>`;
        }
        else if(stock==0){
            //没有库存            
            td.innerHTML = `<div class="w-full px-2">
            <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-red-500/20 text-red-900 py-1 px-2 text-xs rounded-md" style="opacity: 1;">
              <span class="">no</span>
            </div>
          </div>`;
        }
        else{
            //未知
            td.innerHTML = `<div class="w-full px-2">
            <div class="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-amber-500/20 text-amber-900 py-1 px-2 text-xs rounded-md" style="opacity: 1;">
              <span class="">unknown</span>
            </div>
          </div>`;
        }
        return td;
    }
    // console.log(data);
    let t = document.getElementById(tableId);
    let tBody = t.querySelector('tbody');
    data.forEach(p => {
        let tr = document.createElement('tr');
        // class="hover:bg-gray-500"
        tr.setAttribute('class', 'hover:bg-gray-300 opcity-70');
        tr.appendChild(createTd(p.title));
        tr.appendChild(createTd(p.vcores));
        tr.appendChild(createTd(p.ram));
        tr.appendChild(createTd(p.storage));
        tr.appendChild(createTd(p.bandwidth));
        tr.appendChild(createTd('$' + p.price));
        tr.appendChild(createStockTd(p.stock));
        let tdUrl = document.createElement('td');
        tdUrl.innerHTML = `<a href="${p.url}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">BUY</a>`;
        tr.appendChild(tdUrl);
        tBody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded',function(){
    fetch('/data.json')
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // 将响应解析为 JSON 格式
      })
      .then(data => {
        // 处理返回的数据
        let dt = new Date(data.date);
        document.title = `Summary of RackNerd's special VPS packages in ${dt.getFullYear()}, continuously updated`;
        document.querySelector('meta[name="description"]').setAttribute('content', `RackNerd Special VPS Package Summary, RackNerd Special VPS Package Monitoring, Updated to ${dt.toLocaleDateString()}`);
        document.getElementById('date').setAttribute('datetime', dt.toISOString());
        document.getElementById('date').innerText = dt.toLocaleString();
        render_table(data.vps);
      })
      .catch(error => {
        // 处理错误
        console.error('There was a problem with the fetch operation:', error);
      });
});

