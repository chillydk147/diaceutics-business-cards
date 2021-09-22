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
        <div id="portrait-container">
          <div id="P1">
            <a href="https://www.diaceutics.com/"><img alt="Diaceutics" className="logo" src={baseDir+"images/logo.png"}/></a>
          </div>
          <div id="P2">
            {p.LinkedinUrl !== "" ? (
              <a className="name" href={p.LinkedinUrl}><img alt={name} className="photo" src={baseDir+"images/colleagues/" + p.Photo + ".jpg"}/></a>
            ) : (
              <img alt={name} className="photo" src={baseDir+"images/colleagues/" + p.Photo + ".jpg"}/>
            )}
            {p.LinkedinUrl !== "" ? (
              <a className="name" href={p.LinkedinUrl}>{name}</a>
            ) : (
              <span className="name">{name}</span>
            )}
            <span className="info position">{p.JobTitle}</span>
            {p.Department !== "" ? (
              <span className="info position">{p.Department}</span>
            ) : null}
            {p.Country !== "" ? (
              <span className="info position">{p.Country}</span>
            ) : null}
            <a className="info email" href={"mailto:" + p.Email}>
              {p.Email}
            </a>
            {p.Phone1 !== "" ? (
              <span className="info">
                <a className="phone" href={"tel:"+this.cleanPhone(p.Phone1)}>{p.Phone1}</a>
                {p.Phone2 !== "" ? (
                  <span>
                    {" "}
                    |{" "}
                    <a className="phone" href={"tel:"+this.cleanPhone(p.Phone2)}>{p.Phone2}</a>
                  </span>
                ) : null}
              </span>
            ) : null}
            <a className="button" href={baseDir+"/vcards/" + p.Photo + ".vcf"}>Add To Contacts</a><br />
            <img alt={name + " - QR Code"} className="qrcode" src={baseDir+"/images/qrcodes/" + p.Photo + ".jpg"} onClick={this.qrcodeZoom}/>
          </div>
        </div>
        <div id="landscape-container">
          <div id="L1">
            <a href="https://www.diaceutics.com/"><img alt="Diaceutics" className="logo" src={baseDir+"images/logo.png"}/></a>
            {p.LinkedinUrl !== "" ? (
              <a className="name" href={p.LinkedinUrl}><img alt={name} className="photo" src={baseDir+"images/colleagues/" + p.Photo + ".jpg"}/></a>
            ) : (
              <img alt={name} className="photo" src={baseDir+"images/colleagues/" + p.Photo + ".jpg"}/>
            )}            
          </div>
          <div id="L2">
            {p.LinkedinUrl !== "" ? (
              <a className="name" href={p.LinkedinUrl}>{name}</a>
            ) : (
              <span className="name">{name}</span>
            )}
            <span className="info position">{p.JobTitle}</span>
            {p.Department !== "" ? (
              <span className="info position">{p.Department}</span>
            ) : null}
            {p.Country !== "" ? (
              <span className="info position">{p.Country}</span>
            ) : null}
            <a className="info email" href={"mailto:" + p.Email}>
              {p.Email}
            </a>
            {p.Phone1 !== "" ? (
              <span className="info">
                <a className="phone" href={"tel:"+this.cleanPhone(p.Phone1)}>{p.Phone1}</a>
                {p.Phone2 !== "" ? (
                  <span>
                    {" "}
                    |{" "}
                    <a className="phone" href={"tel:"+this.cleanPhone(p.Phone2)}>
                      {p.Phone2}
                    </a>
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
          <div id="L3">
            <img alt={name + " - QR Code"} className="qrcode" src={baseDir+"/images/qrcodes/" + p.Photo + ".jpg"} onClick={this.qrcodeZoom}/>
            <a className="button" href={baseDir+"/vcards/" + p.Photo + ".vcf"}>Add To Contacts</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
