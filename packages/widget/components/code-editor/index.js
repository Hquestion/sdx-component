import CodeEditor from './src/CodeEditor';

CodeEditor.install = Vue => {
    Vue.component(CodeEditor.name, CodeEditor);
};

export default CodeEditor;
