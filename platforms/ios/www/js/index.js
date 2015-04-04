$( document ).ready(function(){
    var $inputNewTask = $('#inputNewTask');
    var $taskList = $('#taskList');
    var taskTouchStart;
    var taskTouchEnd;
    var taskTouchStartX;
    var taskTouchEndX;
    
    
    
    //testing
    var element = document.getElementById('info');
        element.innerHTML = 'Device Name: '     + device.name     + '<br />' +
                            'Device Model: '    + device.model    + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />';


    
   // navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
   //     destinationType: Camera.DestinationType.DATA_URL
   // });
    
   // function onSuccess(imageData) {
   //     var image = document.getElementByID('myImage');
   //     image.src = "data:image/jpeg;base64," + imageData;
   //     console.log("image updated");
   // }
    
   // function onFail(message) {
   //     console.log('Failed because: ' + message);
   // }
    //testing 
    
    
    
    
    if( window.localStorage ) 
    {
        taskList = JSON.parse(window.localStorage.getItem('taskList'));
    }
    
    if(null != taskList)
    {
        for(i=0; i<taskList.length;i++)
        {
            if(taskList[i].done == true) 
            {            
            var newTask = '<li data-key="' + taskList[i].key + '" class="done"><span>' + taskList[i].task + '</span></li>';
            }
            else
            {
            var newTask = '<li data-key="' + taskList[i].key + '"><span>' + taskList[i].task + '</span></li>';
            }
            
            $taskList.append(newTask);
        }
    }
    else
    {
        taskList = new Array();
    }
    
    
    $('#buttonAddNewTask').on('click', function(){
        var key = Date.now();
        var newTask = '<li data-key="' + key + '"><span>' + $inputNewTask.val() + '</span></li>';
        $taskList.append( newTask );
        
        taskList.push({key:key, task:$inputNewTask.val(), done:false});
        if(window.localStorage)
        {
            window.localStorage.setItem('taskList', JSON.stringify(taskList));
        }
        $inputNewTask.val('');
    });
    
    $taskList.on('touchstart','li', function(e){
        var start = document.elementFromPoint(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
        taskTouchStart = $(start).attr('data-key');
        taskTouchStartX = e.originalEvent.touches[0].pageX;        
    });
    
    $taskList.on('touchend','li', function(e){
        var $end;
        var $this = $(this);
        var end = document.elementFromPoint(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY);
        $end = $(end);
        taskTouchEnd = $end.attr('data-key');
        taskTouchEndX = e.originalEvent.touches[0].pageX;  
        
        if (taskTouchStart == taskTouchEnd)
        {
            if(taskTouchStartX < taskTouchEndX)
            {
                if($this.hasClass('done'))
                {
                    $this.removeClass('done');      
                    
                    //update array: mark done as false.
                    for (i=0; i < taskList.length; i++) 
                    {
                        if (taskList[i]['key'] == taskTouchEnd) 
                        {
                            taskList[i]['done'] = false;  
                            break; //stop the loop after found it
                        }
                    }
                    if(window.localStorage)
                    {
                        window.localStorage.setItem('taskList', JSON.stringify(taskList));
                    }                          
                }
                else
                {
                    $this.addClass('done');
                    
                    //update array: mark done as true.                    
                    for (i=0; i < taskList.length; i++) 
                    {
                        if (taskList[i]['key'] == taskTouchEnd) 
                        {
                            taskList[i]['done'] = true;  
                            break; //stop the loop after found it
                        }
                    }
                    if(window.localStorage)
                    {
                        window.localStorage.setItem('taskList', JSON.stringify(taskList));
                    }                       
                }
            }
            else
            {
                taskList = $.grep(taskList, function(e){ return e.key != taskTouchEnd;});
                 
                if(window.localStorage)
                {
                    window.localStorage.setItem('taskList', JSON.stringify(taskList));
                }                
                
                $end.remove();
            }
        }
    });    
    
    
    
    
});