var express = require('express');
var app = express();

var fs = require('fs');

//POST 방식으로 전송한 데이터 사용
app.use(express.urlencoded({ extended: true }));

//jade 설정
app.locals.pretty = true;
app.set('views', './views_file');
app.set('view engine', 'jade');

//topic 작성
app.get('/topic/new', function(req, res){
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        //new.jade 출력
        res.render('new', {topics:files});
    });
})

//main & topic 출력
app.get(['/topic', '/topic/:id'], function(req, res){
    //data 폴더 파일 읽기
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        
        var id = req.params.id;
        if(id){ //id값이 있을 때
            fs.readFile('data/' + id, 'utf8', function(err, data){
                if(err){
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view', {topics:files, title:id, description:data});
            })
        } else { //id값이 없을 때
            //view.jade 출력
            res.render('view', {topics:files, title:'Welcome', description:'Hello, Javascript for server.'});
        }
    })
})

/*
// topic 리스트 클릭 동작
app.get('/topic/:id', function(req, res){
    var id = req.params.id;
    
    //data 폴더 파일 읽기
    fs.readdir('data', function(err, files){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        
        fs.readFile('data/' + id, 'utf8', function(err, data){
            if(err){
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics:files, title:id, description:data});
        })
    })
})
*/

//topic 제출
app.post('/topic', function(req, res){
    var title = req.body.title;
    var description = req.body.description;
    //file 저장 경로 및 내용 설정
    fs.writeFile('data/' + title, description, function(err){
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        //작성 성공시 작성한 글 상세보기 페이지로 redirect
        res.redirect('/topic/' + title);
    });
})

app.listen(3000, function(){
    console.log('Connected, 3000 port!');
})