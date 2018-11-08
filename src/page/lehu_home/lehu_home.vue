<template>
  <div v-if="!showLoading">
    <div class="index-search">
      <i><img src="../../images/index.png"></i>
      <span>搜索&nbsp;:&nbsp;商品</span>
    </div>
    <section class="menu_container">
      <section id="wrapper_menu" class="menu_left" ref="wrapperMenu">
        <ul class="menu_left_box">
          <li v-for="(item,index) in lehutitle" :key="index" class="menu_left_li"
              :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
            <span>{{item.titlename}}</span>
          </li>
        </ul>
      </section>

      <section class="menu_right" ref="menuFoodList">
        <ul>
          <li v-for="(item,index) in lehutitle" :key="index" class="menu_left_li">
            <slider v-bind:lehuTitleSlide="floor"></slider>
          </li>
        </ul>
      </section>

    </section>

    <foot-guide></foot-guide>
    <loading v-show="showLoading"></loading>

    <section class="animation_opactiy shop_back_svg_container" v-if="showLoading">
      <img src="../../images/shop_back_svg.svg">
    </section>

  </div>
</template>

<script>

  import footGuide from '../../components/footer/footGuide'
  import slider from './slider'
  import store from '../../plugins/store.legacy.min'
  import loading from 'src/components/common/loading'
  import {apiRequestTitle, apiRequestContent} from '../../service/getData'

  //加载插件
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        lehutitle: [], //乐虎标题数据
        floor: {},  //楼层数据
        timeStamp: '',
        menuIndex: 0, //已选菜单索引值，默认为0
        menuIndexChange: true,//解决选中index时，scroll监听事件重复判断设置index的bug
        showLoading: false, //显示加载动画
        loadRatings: true
      }
    },

    created() {
    },
    mounted() {
      this.initData();
    },

    components: {
      slider,
      footGuide,
      loading
    },

    computed: {},

    methods: {

      //获取信息
      async initData() {
        //时间戳
        this.timeStamp = Date.parse(new Date());
        this.lehutitleData = await apiRequestTitle();
        let t_id = this.lehutitleData.response[0].id;
        if (this.lehutitleData.code == 1) {
          this.lehutitle = this.lehutitleData.response;
        }

        this.floorData = await apiRequestContent(t_id, this.timeStamp);
        if (this.floorData.code == 1) {
          this.floor = this.floorData.response;
        }
      },

      //用于初始化“商家实景”的横向滚动效果
      _inittabScroll() {
        //先判断是否有这个属性
        if (this.lehutitle) {
          this._onresize();
          this.$nextTick(() => {
            if (!this.Scroll) {
              this.Scroll = new BScroll(this.$refs.wrapperMenu, {
                scrollX: true,
                eventPassthrough: 'vertical' //忽略竖直方向的滚动
              });
            } else {
              this.Scroll.refresh();
            }
          });
        }
      },

      //窗口大小改变触发事件
      _onresize() {
        let that = this;
        that._height();
        window.onresize = function () {
          that._height();
        };
      },
      _height() {
        //计算tab长度
        let ulWidth = 0;
        let listContainer = this.$refs.wrapperMenu;
        let tablength = listContainer.children[0].children.length;
        for (let i = 0; i < tablength; i++) {
          ulWidth += listContainer.children[0].children[i].clientWidth;
        }
        this.$refs.wrapperMenu.children[0].style.width = ulWidth + 'px'; //设置目录的宽度的宽度
        this.$refs.menuFoodList.children[0].style.width = 100 * this.lehutitle.length + '%'; //设置.content的宽度的宽度

        //对列表元素进行固定长度设定
      },

      //点击tab切换
      chooseMenu(index) {
        this.menuIndex = index;
        //menuIndexChange解决运动时listenScroll依然监听的bug
        this.menuIndexChange = false;
        const menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
        const el = menuList[0];
        //滚动中间 设为true，顶部设为false
        this.Scroll.scrollToElement(el, 300, true, true);

        //楼层切换
        let WindowWidth = document.body.clientWidth;
        let Cement = -(index * parseFloat(WindowWidth));

        this.$refs.menuFoodList.children[0].style.transform = 'translate(' + Cement + 'px, 0px) translateZ(0px)';
        this.$refs.menuFoodList.children[0].style.transition = '-webkit-transform 0.3s cubic-bezier(0.333333, 0.666667, 0.666667, 1)';
      },
    },
    watch: {
      'lehutitle'() {
        this.$nextTick(() => {
          this._inittabScroll();
        });
      }
    },
  }

</script>

<style lang="scss" scoped>
  @import '../../style/mixin';

  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar {
    width: 1px;
    height: 1px;
  }

  .index-search {
    width: 100%;
    height: 2rem;
    background: #ffffff;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    display: -webkit-box;
    -webkit-box-orient: horizontal;
    -webkit-box-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    i {
      width: 4rem;
      height: auto;
      display: block;
      margin-left: .5rem;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }
    span {
      width: auto;
      height: 1rem;
      display: block;
      margin: 0 .5rem;
      flex: 1;
      -webkit-box-flex: 1;
      background: url(../../images/lehu_home/search_Icon.png) no-repeat #e6e6e6;
      background-size: .16rem;
      background-position: .1rem center;
      border-radius: .04rem;
      font-size: .2rem;
      color: #999999;
      line-height: 1rem;
      padding-left: 1rem;
    }
  }

  .index-content {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 2rem;

  }

  .menu_container {
    display: block;
    overflow-y: hidden;
    position: relative;
    margin-top: 2rem;
    .menu_left {
      overflow: hidden;
      background: #ffffff;
      .menu_left_box {
        width: auto;
        display: flex;
        display: -ms-flex;
        display: -webkit-box;
        flex-flow: row nowrap;
        -webkit-background-origin: horizontal;
        .menu_left_li {
          width: auto;
          padding: .4rem .6rem;
          box-sizing: border-box;
          position: relative;
          span {
            @include sc(.6rem, #666);
          }
        }
        .activity_menu {
          border-bottom: 0.15rem solid #a63533;
          color: #a63533 !important;
          span:nth-of-type(1) {
            font-weight: bold;
            color: #a63533;
          }
        }
      }
    }
    .menu_right {
      width: 100%;
      height: auto;
      overflow: hidden;
      margin-top: .1rem;
      background: #ffffff;
      ul {
        display: -webkit-flex;
        overflow: hidden;
        li {
          width: 100%;
          overflow-y: auto;
          padding-bottom: .2rem;
          -webkit-flex: 1;
        }
      }
    }
  }
</style>
