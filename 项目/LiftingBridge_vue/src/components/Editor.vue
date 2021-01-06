<template>
  <div class="editor-wapper">
    <span v-if="placeholderVisable" class="placeholder" v-html="placeholder">
    </span>
    <div ref="editor" class="editor">
    </div>
  </div>
</template>

<script>
import WangEditor from 'wangeditor'
export default {
  props: {
    value: {
      default: ''
    },
    disabled: {
      default: false,
      type: Boolean
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      placeholderVisable: true,
      cachedValue: ''
    }
  },
  methods: {
    emitInput(html) {
      var value = html || this.editor.txt.html()
      this.cachedValue = value
      this.$emit('input', this.editor.txt.html())
    },
    setPlaceholder() {
      if (this.disabled || (this.value && this.value.replace(' ', '') !== '<p><br></p>')) {
        this.placeholderVisable = false
      } else {
        this.placeholderVisable = true
      }
    }
  },
  watch: {
    value() {
      if (this.cachedValue !== this.value) {
        this.editor.txt.html(this.value)
      }
      this.setPlaceholder()
    },
    disabled() {
      this.editor.$textElem.attr('contenteditable', !this.disabled)
      this.setPlaceholder()
    }
  },
  mounted() {
    this.setPlaceholder()

    const editor = new WangEditor(this.$refs.editor)
    editor.customConfig.zIndex = 100
    editor.customConfig.uploadImgShowBase64 = true
    editor.customConfig.menus = [
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      // 'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      // 'video', // 插入视频
      // 'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]

    editor.customConfig.onchangeTimeout = 1
    editor.customConfig.onchange = html => {
      this.emitInput(html)
    }

    editor.customConfig.pasteTextHandle = function(content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      return content
    }

    editor.create()
    this.editor = editor
    this.editor.txt.html(this.value)
    this.editor.$textElem.attr('contenteditable', !this.disabled)
  }
}
</script>
<style lang="scss" scoped>
.editor {
  max-height: 1000px;
}
.editor-wapper {
  position: relative;
  .placeholder {
    position: absolute;
    top: 60px;
    left: 10px;
    color: #aaa;
    font-style: italic;
    line-height: 1.5;
  }
}
</style>
