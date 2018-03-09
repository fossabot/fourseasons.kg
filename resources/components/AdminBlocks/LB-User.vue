<template>
    <div class="user-block">
      <div class="user-item">
        <img src='~/assets/UsersImg/1.jpg' alt="">
        <span>Иванов Василий</span>
      </div>
    </div>
</template>
<style lang="less">
.user-block{
  width: 250px;
  height: 90px;
  background-color: #37474f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid #263238;
  .user-item{
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width: 50px;
      height: 50px;
      margin-right: 10px;
      border-radius: 50%;

    }
    span{
      color:#cfd8dc;
      cursor: default;
    }
  }
}
</style>
