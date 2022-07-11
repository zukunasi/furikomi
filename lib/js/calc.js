
//指定した数での(count)の組み合わせパターン取得
function createCombination(nums, count){
  let ans = [];
  if (nums.length < count) {
      return []
  }
  if (count === 1) {
      for (let i = 0; i < nums.length; i++) {
          ans[i] = [nums[i]];
      }
  } else {
      for (let i = 0; i < nums.length - count + 1; i++) {
          let row = createCombination(nums.slice(i + 1), count - 1);
          for (let j = 0; j < row.length; j++) {
              ans.push([nums[i]].concat(row[j]));
          }
      }
  }
  return ans;
}

//リストから謎の振込額を検索する処理
function findCombination(input_list, goal){
  results = []
  for (let j = 1; j < input_list.length; j++){
    combinations = createCombination(input_list, j);
    $.each(combinations, function(count, comb){
      //IEが reduce =>非サポート
      let total = 0;
      comb.forEach(function(value) {
        total = total + value;
      });
//      let total = comb.reduce((sum, element) => sum + element, 0);
      if (total == goal){//goalを明示的に数字にしてない。==で比較
        console.log("push value:" + comb)
        results.push(comb);
      }
    });
  }
  return results;
}


$(function(){
  //ボタンが押された時の処理。
  $('#btn_calc').click(function() {
    setTimeout(function(){
      let goal = $('#transfer_amount').val();
      let inputs = $('#amount_of_moneys').val();
      filtered_list = [];
      list = inputs.split("\n")
      list.forEach(function(money){
        val = money.replace(",", "");
        val = parseInt(val, 10);
        if (!isNaN(val)){//厳密なチェックなら正規表現を使う
          filtered_list.push(val);
        }
      });
      //IE11 非サポート。
      // list = inputs
      //         .split("\n")  //行ごと分割
      //         .map(str => str.replace(",", ""))  //,を削除
      //         .map(str => parseInt(str, 10)) //文字->数値
      //         .filter(Boolean); //不正行削除
      // console.log(list);
      // console.log(goal)
      results = findCombination(filtered_list, goal);
      let msg = results.length + "個の組み合わせが見つかりました\n";
      $('#ans_overview').text(msg);
      results.forEach(function(result){
        $('#ans-list').append('<li class="list-group-item">' + result.join(',') + '</li>');
      });
      console.log(results);
      $('#result_area').text(msg);
      $('#btn_calc').prop("disabled", false);
      if (results.length > 0){
        $('#result_img').append('<img src="./img/kuji_ken1_ooatari.png" width = "200" heigth = "200">');
      } else {
        $('#result_img').append('<img src="./img/kuji_ken3_hazure.png" width = "200" heigth = "200">');
      }

    }
    ,1000);
    $('#ans-list').empty();
    $('#result_img').empty();
    $('#ans_overview').text('検索してます。。。少々お待ちください。。');
    $('#btn_calc').prop("disabled", true);

  })

})
