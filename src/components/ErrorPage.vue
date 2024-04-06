<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'

import ErrorImg from '@/assets/error-page-img/403.svg?url'
import NotFindImg from '@/assets/error-page-img/404.svg?url'

const errorInfoMaps = {
  401: {
    img: ErrorImg,
    title: '401',
    desc: '请先登录',
  },
  403: {
    img: ErrorImg,
    title: '403',
    desc: '抱歉，你无权访问该页面',
  },
  404: {
    img: NotFindImg,
    title: '404',
    desc: '抱歉，你访问的页面不存在',
  },
}

@Component({
  name: 'ErrorPage',
  NotFindImg,
})
export default class ErrorPage extends Vue {
  @Prop({ default: '' }) type!: string

  get errorInfo() {
    return errorInfoMaps[this.type] || errorInfoMaps['403']
  }

  render() {
    return (
      <div class="exception">
        <div class="imgBlock">
          <img src={this.errorInfo.img} />
        </div>
        <div class="content">
          <h1>{this.errorInfo.title}</h1>
          <div class="desc">{this.errorInfo.desc}</div>
          <div class="actions">
            <button class="button" on-click={() => location.reload()}>
              重试
            </button>
          </div>
        </div>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
.exception {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 600px;

  .imgBlock {
    padding-right: 100px;
  }

  .content {
    h1 {
      margin-bottom: 24px;
      font-size: 72px;
      font-weight: 600;
      line-height: 72px;
      color: #434e59;
    }

    .desc {
      margin-bottom: 16px;
      font-size: 20px;
      line-height: 28px;
      color: #8c8c8c;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }

      .button {
        padding: 12px 20px;
        font-size: 14px;
        color: #fff;
        cursor: pointer;
        background-color: #409eff;
        border: 1px solid #409eff;
        border-radius: 4px;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
