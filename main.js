new Vue({
    el: '#app',
    data: {
        platform: '',
        path: '',
        conf: '',
        peersList: [
          'explorer.spaceworks.co',
          'mining.spaceworks.co',
          'electrum1.spaceworks.co',
          'electrum2.spaceworks.co',
          'space.explorer.dexstats.info'
        ],
        optionDaemon: 1,
        optionServer: 1,
        optionAddnodeList: [],
        optionWhiteList: [],
        tempAddnodelist: '',
        tempWhitelist: '',
        customPath: 0,
        optionRpcAllowIp: '127.0.0.1',
        optionRpcBindIp: '127.0.0.1',
        optionRpcWorkQueue: '256',
        optionRpcUser: 'rpcuser',
        optionRpcPassword: Math.random().toString(36).slice(2),
        optionShowMetrics: 0,
        optionStaking: 0,
        optionDataDir: '',
        optionTxIndex: 1,
        optionAddrIndex: 0,
        optionSpentIndex: 0,
        optionTimestampIndex: 0
    },
    methods: {
        setPlatform: function (option) {
          this.platform = option
          if (this.platform == 'Linux') {
            this.path = '/home/user/.komodo/SPACE.conf'
          } else if (this.platform == "Mac OS") {
            this.path = '~/Library/Application Support/Komodo/SPACE.conf'
          } else {
            this.path = 'C:\\Users\\your_username\\AppData\\Roaming\\Komodo\\SPACE.conf'
          }
          $('.platform-banner').show()
          $(document.body).animate({
             'scrollTop':   $('#build').offset().top
          }, 1200);
        },
        showPathInput: function () {
          $('#paths').toggle()
        },
        pickPath: function () {

        },
        addAddnodeList: function (value) {
          this.optionAddnodeList.push(value)
          this.tempAddnodelist = ''
        },
        removeAddnodeListItem: function (item) {
          console.log(item)
          var index = this.optionAddnodeList.indexOf(item)
          this.optionAddnodeList.splice(index, 1)
        },
        addWhiteList: function (value) {
          this.optionWhiteList.push(value)
          this.tempWhitelist = ''
        },
        removeWhiteListItem: function (item) {
          console.log(item)
          var index = this.optionWhiteList.indexOf(item)
          this.optionWhiteList.splice(index, 1)
        },
        compile: function () {
          this.conf =
            "# SPACE Configuration File - generated by Spacecoin Config Generator.<br /><br /># The rpcuser/rpcpassword are used for the local call to spacecoind. The rpcpassword was randomly set.<br /><br />daemon=" + this.optionDaemon + "<br />server=" + this.optionServer + "<br />rpcuser=" + this.optionRpcUser + "<br />rpcpassword=" + this.optionRpcPassword + "<br />rpcallowip=" + this.optionRpcAllowIp + "<br />rpcbind=" + this.optionRpcBindIp + "<br />rpcworkqueue=" + this.optionRpcWorkQueue
          if (this.customPath == 1) {
            this.conf = this.conf + "<br /><br />datadir=" + this.optionDataDir
          }
          this.conf = this.conf + "<br /><br />txindex=1"
          if (this.optionAddrIndex == 1) {
            this.conf = this.conf + "<br />addressindex=1"
          }
          if (this.optionSpentIndex == 1) {
            this.conf = this.conf + "<br />spentindex=1"
          }
          if (this.optionTimestampIndex == 1) {
            this.conf = this.conf + "<br />timestampindex=1"
          }
          if (this.optionShowMetrics == 1) {
            this.conf = this.conf + "<br /><br />showmetrics=1"
          }
          if (this.optionStaking == 1) {
            this.conf = this.conf + "<br /><br />gen=1<br />genproclimit=0"
          }
          for (var i = 0; i< this.peersList.length; i++) {
            if (i == 0) {
              this.conf = this.conf + "<br />"
            }
            this.conf = this.conf + "<br />addnode=" + this.peersList[i]
          }
          if (this.optionAddnodeList.length != 0) {
            this.conf = this.conf + "<br /><br />addnode=" + this.optionAddnodeList
          }
          if (this.optionWhiteList.length != 0) {
            this.conf = this.conf + "<br /><br />whitelist=" + this.optionWhiteList
          }
          $('#profile').show()
        }
      }
});
