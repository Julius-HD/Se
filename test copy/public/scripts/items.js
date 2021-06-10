require.config({ paths: { 'vs': '../min/vs' } });
require(['vs/editor/editor.main'], function () {

    // 初始化变量
    var fileCounter = 0;
    var editorArray = [];
    var defaultCode = [
        '//Write your code here and submit.',
    ].join('\n');

    // 定义编辑器主题
    monaco.editor.defineTheme('myTheme', {
        base: 'vs',
        inherit: true,
        rules: [{ background: 'EDF9FA' }],
        // colors: { 'editor.lineHighlightBackground': '#0000FF20' }
    });
    monaco.editor.setTheme('myTheme');

    // 新建一个编辑器
    function newEditor(container_id, code, language) {
        var model = monaco.editor.createModel(code, language);
        var editor = monaco.editor.create(document.getElementById(container_id), {
            model: model,
        });
        editorArray.push(editor);
        return editor;
    }

    // 新建一个 div
    function addNewEditor(code, language) {
        var new_container = document.createElement("DIV");
        new_container.id = "container-" + fileCounter.toString(10);
        new_container.className = "container";
        document.getElementById("root").appendChild(new_container);
        newEditor(new_container.id, code, language);
        fileCounter += 1;
    }

    addNewEditor(defaultCode, 'javascript');

    // 语法高亮
    var languageSelected = document.querySelector('.language');    
    languageSelected.onchange = function () {
        monaco.editor.setModelLanguage(window.monaco.editor.getModels()[0], languageSelected.value)
    }

    // 点击 button 弹出编辑器内容
    document.getElementById("show-content").addEventListener("click", function () {
        // 获取编辑器内容
        var editor_con = editorArray[0].getValue();
        $.ajax({
            // url:'add',
            // /homeM/add; homeM/add
            type:'post',
            data: {"content": editor_con},
            success: function(data,status){ 
                if(status == 'success'){ 
                    alert("success");
                }
            },
            error: function(data,status){ 
                if(status == 'error'){ 
                    alert("fail");
                }
            }
        })
        // alert(editorArray[0].getValue());
    });
});

    