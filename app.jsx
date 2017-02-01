var Luxy = React.createClass({
    render: function() {
        return (
                <li className='video-list-item'>
                <div className='content'>
                <div className='temp content-link' title={this.props.title}>
                <span className='title'>{this.props.title}</span>
                <span className='stat attribution'>by <span>{this.props.channelTitle}</span></span>
                </div>
                </div>
                <div className='wrapper'>
                <div className="temp">
                <span className='wrap'>
                <img className='luxy-img' alt={this.props.title} src={this.props.imgURL}/>
                </span>
                </div>
                </div>
                </li>
        );
    }
});   // Luxy


{/*  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}

var App = React.createClass({

// ####################################################

componentDidMount: function() {

notify('Loading data from youtube ...',1);

this.getRequest();

window.addEventListener('scroll', this.handleScroll);
},

componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
},

// ####################################################

handleScroll: function(event) {


if($(window).scrollTop() >= ($(document).height() - $(window).height())) {
        notify('Loading data from youtube ...',1);
        this.getRequest(this.refs.search.value);
            }

},

// ####################################################

getInitialState: function() {

return {    
            nextPageToken: '',
            count : 4,
            result :[]
        }


},

// ####################################################

getRequest: function(search = 'react js') {

let sh=search;
sh==='' ? sh='react js' : sh=sh;
let bu=this;

$.ajax({
     cache: false,
     data: $.extend({
     key: 'AIzaSyCmR_Yuildo785qA8zb8JQpeIbNIgNDzPU',
     q: sh,
     part: 'snippet'
    }, {maxResults:20,pageToken:bu.state.nextPageToken}),
                dataType: 'json',
                type: 'GET',
                timeout: 5000,
                url: 'https://www.googleapis.com/youtube/v3/search'
            }).done(function(data) {
                // let sec=bu.state.result;
                // for(let el of data.items){
                //     sec.push(el);
                // }
                // (bu.state.result.length>1) ? bu.setState({result:[...bu.state.result,...data.items]}) : bu.setState({result:data.items});
                // bu.setState({result:bu.state.result.concat(data.items)});
                bu.setState({result:[...bu.state.result,...data.items]});
                bu.setState({nextPageToken:data.nextPageToken});

            })
  .fail(function(err) {
    notify('youtube api call failed: ' + JSON.stringify(err, null, 2));
  })

},

// ####################################################


updateSearch : function(e){
    e.key==='Enter' && this.search(this.refs.search.value);
},

search : function(search = 'react js'){
    this.setState({result:[]});
    this.getRequest(search);
    notify('Loading search result ...',1);
}

,
render: function() {
        return (
            <div>
                <div className='luxyH padding-md'>
                    <img className='fl' src='img/react.png'/>
                    <h1 className='fl w300'> Youtube API Client for LuxySale! </h1>  
                </div> 
                <div className='luxyS padding-md'>
                    <input type='text' name='search' placeholder='Type text and enter.....' ref='search' onKeyPress={(e)=>this.updateSearch(e)}/>
                </div>
                <div className='padding-md'>
                <ul className='video-list'>
                {   
                    this.state.result.map(function(item){
                        return <Luxy key={item.id.channelId || item.id.videoId || item.id.playlistId} title={item.snippet.title} channelTitle={item.snippet.channelTitle} imgURL={item.snippet.thumbnails.medium.url}/>
                    })

                }
                </ul>
                </div>
            </div>
        );
    }
});  // App

ReactDOM.render(<App/>, document.getElementById('root'));


{/**/}


