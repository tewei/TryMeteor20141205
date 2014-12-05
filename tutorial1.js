Tasks = new Mongo.Collection("tasks");
//建立資料庫Tasks
if(Meteor.isClient){
  //body裡的事件
  //傳送new_task表單時新增一筆資料到Tasks
  Template.body.events({
    "submit .new_task": function(e){
      var text = e.target.text.value;
      Tasks.insert({
        text: text,
        time: new Date()
      });
      e.target.text.value = "";
      return false;
    }
  });
  //每個task裡的事件
  //如果點了選取框則此task的checked設為!checked
  //如果點了刪除按鈕則刪除此task
  Template.task.events({
    "click .toggle_checked": function(){
      Tasks.update(this._id, {$set: {checked: !this.checked}});
    },
    "click .delete": function(){
      Tasks.remove(this._id);
    }
  });
  //設定body內的變數
  //tasks為Tasks查詢結果
  Template.body.helpers({
    tasks: function(){
      return Tasks.find({}, {sort: {time: -1}});
    }
  });
}