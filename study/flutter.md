```Container && text 组件```   
```
void main (){
   runApp(
      myApp()
   )
}
class myApp extends StatelessWidget{
   @override
   Widget build (BuildContext context){
      return MaterialApp(
         home:Scaffold(
            appBar:AppBar(   //头部
               title:Text('flutter demo')
            )
         )，
         body:HomeContent()
      )
   }
}

class HomeContent extends StatelessWidget(
   @override
   Widget build(BuildContext context){
      return Center(
         child:Container(
            child:Text(
              '我是一个文本',
               textAlign:TextAlign.center,
               style:TextStyle(
                  fontSize:16.0,
                  color:Colors.red,
                  fontWeight:fontWeight.w300,
                  fontStyle:FontStyle.italic // 字体倾斜,
                  decoration:TextDecoration.lineThrough,   // 横向穿过     
                  letterSpacing：5.0 //字间距           
               ),
               overflow:TextOverflow:ellipsis,//溢出隐藏
               maxLine:1, // 最大行数        
            ),
            height:300.0,
            width:300.0,
            decoration:BoxDecoration(   //边框颜色
               color:Colors.yellow,
               border：Border.all(
                  color:Colors.blue,
                  width:2,0
               )
            ),
            borderRadius:BorderRadius.all( // 圆角
               Radius.circular(8)
            ),
            padding:EdgeInsets.all(10) 
            padding:EdgeInsets.fromLTRB(10,20,300)
            margin: EdgeInsets.all(10),
            transform:Matrix4.translationValues(100,0,0),
            alignment:Alignment.bottomLeft  // 元素方位
         )
      ) 
   }
)
```


