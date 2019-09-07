<template>
  <div class="social-sharing">
    <social-sharing
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
          <network network="googleplus" id="googleplus">
            <i class="fa fa-fw fa-google-plus"></i> Google +
          </network>
        </div>
        <div>
          <network network="linkedin" id="linkedin">
            <i class="fa fa-fw fa-linkedin"></i> LinkedIn
          </network>
        </div>
        <div>
          <network network="whatsapp" id="whatsapp">
            <i class="fa fa-fw fa-whatsapp"></i> Whatsapp
          </network>
        </div>
        <div>
          <network network="telegram" id="telegram">
            <i class="fa fa-fw fa-telegram"></i> Telegram
          </network>
        </div>
        <div>
          <network network="viber" id="viber">
            <i class="fa fa-fw fa-phone-square"></i> Viber
          </network>
        </div>
        <div>
          <network network="skype" id="skype">
            <i class="fa fa-fw fa-skype"></i> Skype
          </network>
        </div>
        <div>
          <network network="weibo" id="weibo">
            <i class="fa fa-fw fa-weibo"></i> Weibo
          </network>
        </div>
        <div>
          <network network="pinterest" id="pinterest">
            <i class="fa fa-fw fa-pinterest"></i> Pinterest
          </network>
        </div>
        <div>
          <network network="email" id="email">
            <i class="fa fa-fw fa-envelope"></i> Email
          </network>
        </div>
        <div>
          <network network="sms" id="sms">
            <i class="fa fa-fw fa-comments"></i> SMS
          </network>
        </div>
      </div>
    </social-sharing>
  </div>
</template>

<script>

export default {
  name: 'SocialSharingBlock'
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
