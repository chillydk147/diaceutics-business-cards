import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      qrcodeZoomed: false
    };
    this.qrcodeZoom = this.qrcodeZoom.bind(this);
    this.qrcodeUnZoom = this.qrcodeUnZoom.bind(this);
  }
  componentDidMount() {}

  componentWillUnmount() {}

  cleanPhone(phone){
    return phone.replace(/[^\d.-/+]/g, '');
  }

  getParams() {
    var params = {};
    var parser = document.createElement("a");
    parser.href = window.location.href;
    var query = parser.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
  }

  qrcodeZoom(){
    this.setState({
      qrcodeZoomed: true   
    });
  }

  qrcodeUnZoom(){
    this.setState({
      qrcodeZoomed: false   
    });
  }
  render() {
    const { baseDir } = this.props;
    const params = this.getParams();
    const person = params["p"] === undefined ? "sarah-colgan" : params["p"];
    let p = this.state.data.filter((p) => p.Photo === person)[0];
    if(p === undefined){
        p = this.state.data.filter((p) => p.Photo === "sarah-colgan")[0];
    }
    let name = p.Prefix +" "+ p.FirstName +" "+ p.MiddleNames +" " + p.LastName;
    name = p.Suffix !== "" ? name + ", " + p.Suffix : name;

    document.title = name;
  return (
      <div>
        <div id="qrcode-mask" className={
            this.state.qrcodeZoomed
              ? ""
              : "hide"
          }>
          <img alt={name + " - QR Code"} src={baseDir+"/images/qrcodes/" + p.Photo + ".jpg"} onClick={this.qrcodeUnZoom}/>
        </div>
        abc1
      </div>
    );
  }
}

export default App;
