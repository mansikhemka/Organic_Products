/**
 * Created by mansikhemka on 10/10/16.
 */


$(function(){
    show();
    $('#add').click(()=>{
        save();
        show();
    })
})

function save(){
    var a=$('#item').val();
    var b=$('#values').val();
    $.post('/savingdb',{items:a,cost:b}, function(data){
        console.log(data);

    })

}

function show(){
    $.get('/showingdb',function(data){
        console.log(data);

        var list="<tr><td>SERIAL NUMBER</td><td>PRODUCT</td><td>PRICE</td></tr>";
        for(var i=0;i<data.length;i++){
            console.log(data[i].sno);
            var item;
            item ="<tr id='"+i+"'>"+
                "<td>"+i+"</td>"+
                "<td>"+data[i].sno+"</td>"+
                "<td>"+data[i]. price+"</td>"+"</tr>";
            list = list + item;

        }
        // list = list +"</table>"
        console.log(list);
        $('.mk').html(list);                                        //problem here

    })
}