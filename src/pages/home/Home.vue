<template>
  <div class="container">
    <section class="image bg1"></section>
    <section class="heading">
      <h1>守护美好家园</h1>
    </section>
    <section class="text" style="--bg: #c8c8bc">
      <h2>
        气候变化是一项跨国界的全球性挑战，这从来是一个人或一个国家的事，而是与我们每个人息息相关。它正在影响每个大洲的各个国家，扰乱国家经济发展并影响人民的生活，未来的代价甚至更为沉重。我们能做的只有，团结合作起来，一起守护好地球家园。
      </h2>
    </section>
    <section class="image bg2">
    </section>
    <section class="heading">
      <h1>了解中国行动</h1>
    </section>
    <section class="text" style="--bg: #638a87">
      <h2>中国正在全球气候治理中发挥重要参与者、贡献者和引领者的作用。2020年9月22日习近平主席在第七十五届联合国大会上提出力争2030年前实现碳达峰、2060年实现碳中和的目标。“双碳”目标的提出，是中国对世界发出的庄严承诺，也是中国积极应对全球气候危机、着力推动构建人类命运共同体的担当体现。</h2>
    </section>
    
    <footer class="footer">

    </footer>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
h1{
  font-size: clamp(16px,5vw,30px);
}
h2{
  line-height: 1.5;
  font-size: clamp(16px,5vw,20px);
}
.container {
  height: calc(100vh - 60px);
  overflow: hidden;
  overflow-y: auto;
  perspective: 3px;
}

section {
  background-size: cover;
  background-position: center;
  color: white;
  background-color: var(--bg, --color-black);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &.image {
    background-position: center center;
    transform: translateZ(-1px) scale(1.5);
    background-size: cover;
    z-index: -1;
    height: calc(100vh - 60px);
  }

  &.text {
    height: 50vh;
    padding: 0 clamp(10px,10vw,200px);
  
  }

  &.heading {
    z-index: -1;
    transform: translateY(-40vh) translateZ(1px) scale(1.5);
  }
}
.bg1{
  background-image: url("./assets/bg2.jpg");
}
.bg2{
  background-image: url("./assets/bg1.jpg");
}

</style>