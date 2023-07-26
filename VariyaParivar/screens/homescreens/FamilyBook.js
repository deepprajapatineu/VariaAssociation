import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity,
    Button,
    TextInput,
    Picker
} from 'react-native';
import {
       Avatar,
       List
} from 'react-native-paper'
import PropTypes from 'prop-types';
import Svg, {
    Line,
} from 'react-native-svg';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
const Sample = require('./sample.json');

export default class FamilyBook extends Component {
// const { navigation } = this.props;
componentDidMount() {
  // this.getDetail();
    // console.log("Component did mount", this.state.count)
     fetch(`http://192.168.225.234:8085/familypersondetail/${this.state.pid}/${this.state.village}`)
            .then(response => response.json())
            .then((responseJson)=> {
               
                this.setState({ count: responseJson})
                console.log("yes")
                   
            })
            .catch(error=>console.log("Error he:-"+ error)) 
    //         console.log("count:-", this.state.count)
    // console.log("ID:-"+this.state.pid)
        
  }
    constructor(props) {
        super(props);
        this.state = {
            pname: this.props.route.params.name,
            pid : this.props.route.params.id,
        //    name: this.props.navigation.getParam('name'),
          village:this.props.route.params.village,
          name:"",
      count:[],
      showPartner:false,
    };
      //   const [data, setData] = React.useState({
      // username:''
      // });
    }

    hasChildren(member) {
        return member.children && member.children.length;
    }

    getDetail(){
       fetch(`http://192.168.225.234:8085/family/${this.state.village}`)
            .then(response => response.json())
            .then((responseJson)=> {
               
                this.setState({ count: responseJson})
                console.log("yes")
                   console.log("count:-", this.state.count)
            })
            .catch(error=>console.log("Error he:-"+ error)) 
            // console.log("count:-", this.state.count)
        //  this.setState({ count: 1 })
    }

     getDetailByName(){
       fetch(`http://192.168.225.234:8085/familypersondetail/${this.state.pid}`)
            .then(response => response.json())
            .then((responseJson)=> {
               
                this.setState({ count: responseJson})
                console.log("yes"+responseJson)
                   
            })
            .catch(error=>console.log("Error he:-"+ error)) 
            console.log("count:-", this.state.count)
        //  this.setState({ count: 1 })
    }

    renderTree(data, level) {
        return (
            <FlatList
                data={data}
                horizontal={true}
                contentContainerStyle={{ padding: 50 }}
                keyExtractor={(item, index) => `${item.id} + ${item.name}`}
                listKey={(item, index) => `${item.id} + ${item.name}`}
                initialScrollIndex={0}
                renderItem={({ item, index }) => {
                    const {id, name, village, wifeName, mobileNumber, gender, partner1 } = item;
                    const info = {id, name, village, wifeName, mobileNumber, gender, partner1 };
                    let dpUrl = {uri:`${item.profilePic}`}
                    
                    return (
                        <View style={{
                            // backgroundColor:"lightgray",
                            padding:30,
                            // borderRadius:10,
                            paddingTop:50,
                        }}>
                        <View
                            style={{

                                justifyContent: 'center',
                                alignItems: 'center',
                                paddingLeft: this.props.siblingGap / 2,
                                paddingRight: this.props.siblingGap / 2,
                                
                            }}>
                            <View style={{
                                flexDirection: 'column',
                                alignItems: 'center',
                                
                            }}>
                                <View style={{
                                    ...this.props.nodeStyle,
                                    
                                }}>
                                
                                    {/* <Image style={{ ...this.props.imageStyle }}
                                        // source={{ uri: "http://192.168.225.234:8085/profile_image/20190903_223416.jpg" }}  
                                        source={dpUrl}
                                        /> */}
                                        <TouchableOpacity 
                                            onPress={()=>this.props.navigation.navigate('DpOpen',{dpuri:item.profilePic})}
                                        >
                                        <Avatar.Image
                                                source={dpUrl}
                                                    size={100}
                                                />
                                                </TouchableOpacity>
                                        <View style={{
                                    ...this.props.nodeStyle2,
                                    // flexDirection:"row",
                                }}>
                                   
                                 
                                 {/* ------------------------------------------------------------------------------------------------ */}
                                        <TouchableOpacity  
                                      onPress={() => this.props.navigation.navigate("FamilyPresonDetail",{name:info.name, id:info.id, village:info.village, partner:"No Data Found"})}                                    
                                                >
                                               {(() => {

                                            if (info.partner1 == undefined) {
                                                return <Text style={{ ...this.props.nodeTitleStyle, color: this.props.nodeTitleColor }}>{info.name}</Text>;
                                            }
                                            })()}</TouchableOpacity>

                                             <TouchableOpacity  
                                           onPress={() => this.props.navigation.navigate("FamilyPresonDetail",{name:info.name, id:info.id, village:info.village, partner:info.partner1[0].name})}                          

                                                >
                                               {(() => {

                                            if (!(info.partner1 == undefined)) {
                                                {/* console.log(item.name+":"+info.partner1[0].name) */}
                                                return <Text style={{
                                                ...this.props.nodeTitleStyle,
                                                }}> {info.name}</Text>;
                                            }
                                            })()}</TouchableOpacity>
                               {/* ---------------------------------------------------------------------------------------------------------- */}

                                            <TouchableOpacity       
                                            style={{
                                            
                                        }}           
                                         onPress={() => this.props.navigation.navigate("FamilyPresonDetail",{name:info.partner1[0].name, id:info.partner1[0].id, village:info.partner1[0].village, partner:info.name})}                          
                                                >
                                            
                                               {(() => {

                                            if (!(item.partner1 == undefined)) {
                                                return <Text style={{
                                                ...this.props.nodeTitleStyle,
                                                }}>({info.partner1[0].name})</Text>;
                                            }
                                            })()}

                                            </TouchableOpacity>
                                            <TouchableOpacity  
                                            style={{
                                            
                                        }}                                            
                                                >
                                               {(() => {

                                            if (item.partner1 == undefined) {
                                                return <Text style={{
                                                ...this.props.nodeTitleStyle,
                                                }}> (No Data Found)</Text>;
                                            }
                                            })()}</TouchableOpacity>                                

                                    </View>
                                </View>
                            </View>
                            {
                                this.hasChildren(item) && <Svg height="20" width="20">
                                    <Line x1="50%" y1="0" x2="50%" y2="150" stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                </Svg>
                            }
                            <View style={{
                                flexDirection: 'row'

                            }}>
                                {
                                    this.hasChildren(item) && item.children.map((child, index) => {
                                        const { id, name, village, wifeName, mobileNumber, gender, partner1  } = child;
                                        const info = {id, name, village, wifeName, mobileNumber, gender, partner1  };
                                        return (
                                            <View key={child.id + child.name}
                                                style={{
                                                    flexDirection: 'row'
                                                }}
                                            >
                                                <View>
                                                    <Svg height="20" width="100%" >

                                                        <Line x1="50%" y1="0" x2="50%" y2="100%" stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                                        {/* Right side horizontal line */}
                                                        {
                                                            this.hasChildren(item) && item.children.length != 1 && item.children.length - 1 !== index &&
                                                            <Line x1="100%" y1={this.props.strokeWidth / 2} x2="50%" y2={this.props.strokeWidth / 2} stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                                        }
                                                        {/* Left side horizontal line */}
                                                        {
                                                            this.hasChildren(item) && item.children.length != 1 && index !== 0 &&
                                                            <Line x1="50%" y1={this.props.strokeWidth / 2} x2="0" y2={this.props.strokeWidth / 2} stroke={this.props.pathColor} strokeWidth={this.props.strokeWidth} />
                                                        }
                                                    </Svg>
                                                    {
                                                        this.renderTree([child], level + 1)
                                                    }
                                                </View>
                                                {

                                                }
                                                <View style={{
                                                    height: this.props.strokeWidth,
                                                    backgroundColor: this.hasChildren(item) && (item.children.length - 1) !== index ? this.props.pathColor : 'transparent',
                                                    width: this.hasChildren(child) && (child.children.length - 1) !== index ?
                                                        level * this.props.familyGap
                                                        : 0
                                                }} />

                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        </View>
                        
                    )
                }}
            />
        )
    }

    render() {
        const {
            title,
            titleStyle,
            titleColor
        } = this.props;
        return (
            <View style={{ flex: 1,
                justifyContent: "center",
        alignItems: "center",
     }}>

                <Text style={{ ...titleStyle, color: titleColor }}>
                Family Of {this.state.pname}
                </Text>
                                
 <ScrollView style={ this.props.scrollStyle }>
       
                <View style={ this.props.container }>
                   <ReactNativeZoomableView
                    maxZoom={2}
                    minZoom={0.5}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    // onZoomAfter={this.logOutZoomState}
                    style={{
                        // padding: 10,
                        backgroundColor: 'white',
                    }}
                    >
      
             
                {
                    this.renderTree(this.state.count, 1)
                }
                
                
                 </ReactNativeZoomableView>
                </View>
                 

                 </ScrollView>
                
            </View>
        )
    }
}

FamilyBook.defaultProps = {
    title: "My Family",
    scrollStyle:{
      // backgroundColor:"red",  
      // paddingTop:100
    //    justifyContent: "center",
    //     alignItems: "center",
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },
    titleColor: 'black',
    data: Sample,
    nodeStyle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover"
    },
    nodeStyle2: {
        width: 200,    
         justifyContent: "center",
        alignItems: "center",
        resizeMode: "cover",
        marginBottom:40,
    },
    nodeTitleStyle: {
        fontSize: 14,
        fontWeight: "bold",
        // marginBottom:40,
    },
    nodeTouchStyle:{
        backgroundColor:"red",
        // width:100,
        // height:50,
        padding:100
    },
    pathColor: 'black',
    siblingGap: 70,
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        resizeMode: 'cover'
    },
    nodeTitleColor: "black",
    familyGap: 30,
    strokeWidth: 5,
      pickercontainer:{
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor:'#a6a6a6',
    // borderWidth:4,
    // borderColor:'#a6a6a6',
    borderRadius:10,
    width:"100%"
  },
  picker:{
    width:200,
    height:50,
  },
}

FamilyBook.propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    // scrollStyle:PropTypes.object,
    data: PropTypes.array,
    nodeStyle: PropTypes.object,
    nodeTitleStyle: PropTypes.object,
    pathColor: PropTypes.string,
    siblingGap: PropTypes.number,
    imageStyle: PropTypes.object,
    nodeTitleColor: PropTypes.string,
    familyGap: PropTypes.number,
    strokeWidth: PropTypes.number,
    titleColor: PropTypes.string,
    nodeTouchStyle:PropTypes.object,
}
