layui.use(['form', 'table'], function () {
    var table = layui.table;

    var h = document.body.scrollHeight;
    var w = document.body.scrollWidth;

    table.render({
        elem: '#api'
        , height: h - 50
        , url: '/Api' //数据接口
        , page: true //开启分页
        , skin: 'line' //行边框风格
        , even: true //开启隔行背景
        , size: 'lg' //大尺寸的表格
        , align: 'center'
        , cols: [[ //表头
            {field: 'project_id', title: '项目名称', align: 'center'}
            , {field: 'name', title: '接口名称', align: 'center'}
            , {field: 'url', title: '接口地址', align: 'center'}
            , {field: 'model_id', title: '所属模块', align: 'center'}
            , {field: 'protocol', title: '接口协议', align: 'center'}
            , {field: 'produces', title: '请求格式', align: 'center'}
            , {field: 'consumes', title: '响应格式', align: 'center'}
            , {field: 'method', title: '请求方法', align: 'center'}
            , {field: 'version', title: '接口版本', align: 'center'}
            , {field: 'status', title: '接口状态', align: 'center'}
            , {field: 'description', title: '接口描述', align: 'center'}
            , {field: 'operate', title: '操作', align: 'center', templet: '#operateTpl'}
        ]]
        , response: {
            statusName: 'respCode' //数据状态的字段名称，默认：code
            , statusCode: 2000 //成功的状态码，默认：0
            , msgName: 'respMsg' //状态信息的字段名称，默认：msg
            , countName: 'total' //数据总数的字段名称，默认：count
            , dataName: 'data' //数据列表的字段名称，默认：data
        }
    });
    table.on('sort(apiFilter)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        // console.log(obj.field); //当前排序的字段名
        // console.log(obj.type); //当前排序类型：desc（降序）、asc（升序）、null（空对象，默认排序）
        // console.log(this); //当前排序的 th 对象

        //尽管我们的 table 自带排序功能，但并没有请求服务端。
        //有些时候，你可能需要根据当前排序的字段，重新向服务端发送请求，从而实现服务端排序，如：
        table.reload('api', {
            initSort: obj //记录初始排序，如果不设的话，将无法标记表头的排序状态。 layui 2.1.1 新增参数
            , where: { //请求参数（注意：这里面的参数可任意定义，并非下面固定的格式）
                field: obj.field //排序字段
                , order: obj.type //排序方式
            }
        });
    });
    //监听工具条
    table.on('tool(apiFilter)', function (obj) { //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if (layEvent === 'del') { //删除
            layer.confirm('真的删除行么', function (index) {
                //向服务端发送删除指令
                $.ajax({
                    url: "/Api/Delete",//这个就是请求地址对应sAjaxSource
                    data: JSON.stringify({"id": data.id}),
                    type: 'post',
                    contentType: "application/json",
                    dataType: 'JSON',
                    async: false,
                    success: function (result) {
                        if (result.respCode == '2000') {
                            obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                            layer.close(index);
                            layer.msg('删除成功！', {icon: 6});
                        } else {
                            layer.msg('删除失败！', {icon: 5})
                        }
                    },
                    error: function (msg) {
                    }
                });
            });
        } else if (layEvent === 'edit') { //编辑
            //打开模态框进行修改
            layer.open({
                type: 2
                , skin: 'layui-layer-lan'
                , anim: 4 //弹出方式
                , shadeClose: true //开启遮罩关闭
                , title: data.name + '信息修改'
                , content: '/Api/getEdit?id=' + data.id //这里content是一个普通的String
                , area: [(w - 400) + 'px', (h - 150) + 'px']
                , closeBtn: 0 //关闭按钮
            });

            //同步更新缓存对应的值
            // obj.update({
            //     name: '123'
            // });
        }
    });
    $('#add').on('click', function () {
        layer.open({
            type: 2
            , skin: 'layui-layer-lan'
            , anim: 4 //弹出方式
            , shadeClose: true //开启遮罩关闭
            , title: '信息增加'
            , content: "/Api/goAdd" //这里content是一个普通的String
            , area: [(w - 400) + 'px', (h - 150) + 'px']
            , closeBtn: 0 //关闭按钮
        });
    });
});
