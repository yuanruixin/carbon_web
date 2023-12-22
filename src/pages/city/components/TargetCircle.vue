<!-- 目标扇形环 -->
<template>
  <div class="wrapper">
    <div class="circle">
      <div class="bg-wrapper">
      <div class="bg">
        <div class="content">
          <svg t="1703062713038" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            p-id="11103" width="200" height="200">
            <path
              d="M597.333333 366.336V256a42.666667 42.666667 0 0 1 12.501334-30.165333l128-128a42.666667 42.666667 0 0 1 68.309333 11.093333l36.309333 72.618667 72.618667 36.266666a42.666667 42.666667 0 0 1 11.093333 68.352l-128 128A42.666667 42.666667 0 0 1 768 426.666667h-110.336l-115.498667 115.498666a42.666667 42.666667 0 0 1-60.330666-60.330666L597.333333 366.336zM512 128a42.666667 42.666667 0 0 1 0 85.333333 298.666667 298.666667 0 1 0 298.666667 298.666667 42.666667 42.666667 0 0 1 85.333333 0 384 384 0 1 1-384-384z m0 170.666667a42.666667 42.666667 0 0 1 0 85.333333 128 128 0 1 0 128 128 42.666667 42.666667 0 0 1 85.333333 0 213.333333 213.333333 0 1 1-213.333333-213.333333z m170.666667-25.002667V341.333333h67.669333l73.642667-73.642666-32.426667-16.213334a42.666667 42.666667 0 0 1-19.029333-19.072l-16.213334-32.384L682.666667 273.664z"
              p-id="11104" fill="#1360fe"></path>
          </svg>
          <span class="date">{{ props.date }}</span>
        </div>
      </div>
    </div>
    </div>
    <h2 class="text">{{ props.text }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  date: {
    default: "2022"
  },
  text: {
    default: "示例目标"
  },
})
</script>

<style lang="scss" scoped>
.wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
}
.circle{
  width: 330px;
  height: 330px;
  border: 1px dashed #0E5CFE;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bg-wrapper {
  width: 276px;
  height: 276px;
  border: 1px dashed #0E5CFE;
  border-radius: 50%;
  .bg {
    width: 224px;
    height: 224px;
    border: 26px solid #cfdeff;
    border-radius: 50%;
    margin: 0 auto;
    text-align: center;
    font-size: 50px;

    .content {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows:  1fr 2fr;
      justify-items: center;
      
      row-gap: 20px;
      svg{
        align-self: end;
        width: 60px;
        height: 60px;
      }
    }
  }
}

</style>