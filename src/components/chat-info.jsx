import { faCalendar, faClock, faComment, faEnvelope, faLink, faTrashAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { connect } from "react-redux";
import ProfileAvatar from "./avatar";
import * as ChatActions from '../actions/chat-actions';


const ChatInfo=({selectedChat,users,removeFromChat})=>{
    const [selectedUserDetails,setSelectedUserDetails]= useState({name:"",mail:""});
    const series= [{
        name: 'Day',
        data: [0,1,0,3,2,0,0]
      }];
     const options= {
        chart: {
          height: 100,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            dataLabels: {
              position: 'bottom', // top, center, bottom
            },
          }
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return val ;
          },
          offsetY: -10,
          style: {
            fontSize: '10px',
            colors: ["#304758"]
          }
        },
        
        xaxis: {
          categories: ["MON","TUE","WED","THU","FRI","SAT","SUN"],
          position: 'bottom',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: false,
          }
        },
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val;
            }
          }
        
        },
        title: {
          text: '',
          floating: false,
          offsetY: 150,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      };
     useEffect(()=>{
        if(users.length>0){
            let selcUser=users.find(user=>user.id === selectedChat.userId);
            setSelectedUserDetails(selcUser);
        }
     },[selectedChat])

    return <>
    <div className="userInfo block">
        {/* <div className=""><div className="image">HB</div></div> */}
        <div className=""><ProfileAvatar link={selectedUserDetails?.profilePic} width={"80px"} name={selectedUserDetails?.name}/></div>
        
        <div className="mail  d-f">
            <div className=" p-r-l-5">
                <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <div className=" p-r-l-5">
                {selectedUserDetails?.mail}
            </div>
        </div>
        <div className=" user d-f">
            <div className=" p-r-l-5">
                <FontAwesomeIcon icon={faUserCircle} />
            </div>
            <div className=" p-r-l-5">
            {selectedUserDetails?.name }
            </div>
        </div>
        {
            selectedChat?.history?.length>0 ?
            <button type="button" className="btn btn-clipboard m-t-5" onClick={()=>removeFromChat()}>Archive <FontAwesomeIcon icon={faTrashAlt}/>
            </button>
            : <></>
        }
    </div>
    <div className="stats block m-t-30 ">
        <div className="row m-b-5 d-f ">
            <div className="col col-lg-6 col-sm-12 m-b-15 mail d-f " >
                <div className="col stats-block" style={{backgroundColor:"#d9e3fc",color:"#114bef"}}>
                    <div className="p-r-l-5 stats-shadow" style={{backgroundColor:"#7f99db"}}>
                        <FontAwesomeIcon icon={faClock} />
                    </div>
                    <div className="p-r-l-5">
                        13h
                        <div className="f-0-7 c-b">Time</div>
                    </div>
                </div>
            </div>
            <div className="col col-lg-6 col-sm-12 m-b-15 user d-f " >
                <div className="col stats-block" style={{backgroundColor:"#e1f7f4",color:"#14b69a"}}>
                    <div className="p-r-l-5 stats-shadow " style={{backgroundColor:"#a3e5da"}}>
                        <FontAwesomeIcon icon={faUserCircle} />
                    </div>
                    <div className="p-r-l-5">
                        188
                        <div className="f-0-7 c-b">Attended</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row m-b-5 d-f ">
            <div className="col col-lg-6 col-sm-12 m-b-15 mail d-f " >
                <div className="col stats-block" style={{backgroundColor:"#f7f4fd",color:"#7061b3"}}>
                    <div className="p-r-l-5 stats-shadow " style={{backgroundColor:"#d7d4dd"}}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <div className="p-r-l-5">
                        119
                        <div className="f-0-7 c-b">Meetings</div>
                    </div>
                </div>
            </div>
            <div className="col col-lg-6 col-sm-12 m-b-15 user d-f " >
                <div className="col stats-block" style={{backgroundColor:"#fff0eb",color:"#ff653d"}}>
                    <div className="p-r-l-5 stats-shadow" style={{backgroundColor:"#f5b7a3"}}>
                        <FontAwesomeIcon icon={faComment} />
                    </div>
                    <div className="p-r-l-5">
                        41
                        <div className="f-0-7 c-b">Rejected</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="f-b float-left ">Current week</div>
        <div className="c-b f-0-7" >Activity</div>
        <div id="chart">
        <ReactApexChart options={options} series={series} type="bar" height={150} />
        </div>

    </div>
    
    <div className="userInfo block m-t-30">
        <div className="f-b heading-font">Onboard Clients</div>
        <div className="">Share the link with prospects and discuss all stuff</div>
        <div className="">
        <button type="button" className="btn btn-primary m-t-5">Copy Link <FontAwesomeIcon icon={faLink}/></button>
            
        </div>
        
    </div>
    
    </>
};

const mapStateToProps=(state)=>{
    return{
        users:state.usersReducer.users,
        selectedChat:state.chatReducer.selectedChat,

    }
};
const mapDispatchToProps=(dispatch)=>({
    removeFromChat:()=> dispatch(ChatActions.removeFromChat()),
  });
const ConnectedChatInfo=connect(mapStateToProps,mapDispatchToProps)(ChatInfo);
export default ConnectedChatInfo;
