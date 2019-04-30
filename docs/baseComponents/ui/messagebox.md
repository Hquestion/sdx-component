# MessageBox 提示框
---

基础按钮组件

## Examples

<Common-BasicUsage>
  <ui-messagebox-index></ui-messagebox-index>
  <highlight-code slot="codeText" lang="vue">
    <template>
      <div class="demo-button">
        <SdxuButton type="default">默认</SdxuButton>
        <SdxuButton type="primary">primary</SdxuButton>
        <SdxuButton type="primary" size="small">small</SdxuButton>
        <SdxuButton type="primary" size="regular" :invert="true">invert</SdxuButton>
        <SdxuButton type="primary" size="regular" :loading="true">loading</SdxuButton>
        <SdxuButton type="primary" size="regular" :plain="true">文字按钮</SdxuButton>
        <SdxuButton type="primary" size="regular" :disabled="true">禁用</SdxuButton>
        <SdxuButton type="default" size="regular" :shadow="true">投影</SdxuButton>
        <SdxuButton type="primary" size="regular" :block="true">block</SdxuButton>
      </div>
    </template>
  </highlight-code>
</Common-BasicUsage>