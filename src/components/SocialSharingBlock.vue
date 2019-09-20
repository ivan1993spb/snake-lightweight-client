<template>
  <div class="social-sharing">
    <social-sharing
                    :url="url"
                    title="Snake Online - Join the game!"
                    description="Join Snake Online Game"
                    hashtags="snake,online,game"
                    v-cloak inline-template>
      <div class="social-sharing-list">
        <b>Invite your friends in the game:</b>
        <div>
          <network network="facebook" id="facebook">
            <i class="fa fa-fw fa-facebook"></i> Facebook
          </network>
        </div>
        <div>
          <network network="twitter" id="twitter">
            <i class="fa fa-fw fa-twitter"></i> Twitter
          </network>
        </div>
        <div>
          <network network="reddit" id="reddit">
            <i class="fa fa-fw fa-reddit"></i> Reddit
          </network>
        </div>
        <div>
          <network network="vk" id="vk">
            <i class="fa fa-fw fa-vk"></i> VK
          </network>
        </div>
        <div>
          <network network="odnoklassniki" id="odnoklassniki">
            <i class="fa fa-fw fa-odnoklassniki"></i> Ok
          </network>
        </div>
        <div>
          <network network="telegram" id="telegram">
            <i class="fa fa-fw fa-telegram"></i> Telegram
          </network>
        </div>
      </div>
    </social-sharing>
  </div>
</template>

<script>

export default {
  name: 'SocialSharingBlock',
  computed: {
    url () {
      return parent.location.href
    }
  }
}
</script>

<style lang="scss">
.social-sharing {
  margin: 10px 0px;
  padding: 10px;
  background: #888;
  display: block;
  color: #000;

  .social-sharing-list {
    b {
      margin-right: 10px;
      font-size: 1.3rem;
    }

    div {
      justify-content: space-between;
      cursor: pointer;
      display: inline-block;
      padding: 3px 6px;
    }

    div:hover {
      color: #fff;
      background: #000;
    }
  }
}

</style>
