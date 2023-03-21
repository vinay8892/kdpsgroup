// file: script.js
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCRQS_hoKMBPLUsMtieZLFoGgPouDsJayo",
    authDomain: "kdpsgroup-2c331.firebaseapp.com",
    databaseURL: "https://kdpsgroup-2c331-default-rtdb.firebaseio.com",
    projectId: "kdpsgroup-2c331",
    storageBucket: "kdpsgroup-2c331.appspot.com",
    messagingSenderId: "909525600307",
    appId: "1:909525600307:web:f8c1b4ae7b44055e393b46"
  };
  
firebase.initializeApp(config);

let enableFlashMessage = "false";
let messageHeading="Happy New Year";
let messageBody="https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Images/flashMessageImage.jpg";
let enableAdmissionPOPUP="false";
let admissionMessage="";
let enableDebugAndTesting="false";
var imgUrl="";
var files = [];
let imageFolders=[];
let bImageUploadTabClicked=false;
let assignments=[];
var row_index=-1;
var documentRef='ABC';
let assignmentFields=[];

$(document).ready(function(){
	    if (enableDebugAndTesting=="false")
		{
			if(sessionStorage.getItem("loggedInAdmn")==null)
			{
				$("#myModal").modal();
			}
			else
			{
				$("#bodyDiv").append(sessionStorage.getItem("adminContentPageHtml"));
				PopulateWebsiteConfigData();
			}
		}
		else
		{
			PopulateWebsiteConfigData();
		}


});

$("#btnlogin").click(function(){
  login_click();
});

function login_click(){
	let uid= $("#usrname").val();
	let pwd= $("#psw").val();

    if(sessionStorage.getItem("loggedInAdmn")==null)
	{	
		$.ajax({
			url: 'https://tgroz9ryhi.execute-api.ap-south-1.amazonaws.com/Prod/api/AuthenticateClient',
			method: 'POST',
			data: {

				userId: uid ,
				password: pwd,
				clientName: 'KDPS',

			},
			success: function (returnData) {
				  bAuthenticated="true";
				  $('#myModal').modal('hide');
				  if (enableDebugAndTesting=="false")
				  {
					  $("#bodyDiv").append(returnData.adminPanelContent);
				  }				  
				  //loadAdminPanelContents();	                  				  
				  PopulateWebsiteConfigData();
				  sessionStorage.setItem("loggedInAdmn", "true");
				  sessionStorage.setItem("adminContentPageHtml", returnData.adminPanelContent);
			},
			error: function () {
				 sessionStorage.setItem("loggedInAdmn", "false");
			}

		});
	}
	
}

function loadAdminPanelContents()
{
	    $.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/AdminPanelPageData.txt',
		//url: 'http://localhost:85/kdpsadmin/AdminPanelPageData.txt',
		method: 'GET',
		success: function (data) {
              $("#bodyDiv").append(data);			  
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
}

function PopulateWebsiteConfigData(){
		$.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/WebsiteConfig.json',
		//url: 'http://localhost:85/Config/WebsiteConfig.json',
		method: 'GET',
		success: function (data) {
			  enableFlashMessage=data.enableFlashMessage;
			  messageHeading=data.messageHeading;
			  messageBody=data.messageBody;
			  enableAdmissionPOPUP=data.enableAdmissionPOPUP;
			  admissionMessage=data.admissionMessage;
			  if (sessionStorage.getItem("loggedInAdmn")=="true")
			  {
				 ConstructConfigHtmlFromObject(); 
			  }		      
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
}

function PopulateImageFileData(){
   let rowToAdd='';
   let ImageFileData=[];
   for(var i = 1;i<ImageJsonTable.rows.length;){
            ImageJsonTable.deleteRow(i);
        }
   let rowData='<tr><td><div contenteditable>@displayname</div></td><td><div contenteditable>@bucketname</div></td><td><div contenteditable>@display</div></td></tr>';
   
   		$.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/ImageFiles.json',
		//url: 'http://localhost:85/Config/ImageFiles.json',
		method: 'GET',
		success: function (data) {
			  ImageFileData=data;
			  for(let filedata of ImageFileData) 
			  {
                 rowToAdd=rowData.replace('@displayname',filedata.DisplayName);
				 rowToAdd=rowToAdd.replace('@bucketname',filedata.BucketName);
				 rowToAdd=rowToAdd.replace('@display',filedata.Display);
				 $('#ImageJsonTable tr:last').after(rowToAdd);
			  }				  
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
	
}

function PopulateAssignmentModal(){
   let rowToAdd='';
   for(var i = 1;i<AssignmentsTable.rows.length;){
            AssignmentsTable.deleteRow(i);
        }		
   let rowData='<tr><td>@assignmentReff</td><td>@displayname</td><td>@display</td><td><input type="checkbox"/></td></tr>';
   
  for(let filedata of assignmentFields) 
  {
	 rowToAdd=rowData.replace('@assignmentReff',filedata.AssignmentRef);
	 rowToAdd=rowToAdd.replace('@displayname',filedata.AssignmentDisplayText);
	 rowToAdd=rowToAdd.replace('@display',filedata.Display);
	 $('#AssignmentsTable tr:last').after(rowToAdd);
  }	
	
}

function PopulateAssignmentField(){
   let rowToAdd='';
   assignmentFields=[];
   $('#assignmentField').html('');
        let rowData='<br/><button class="buttonAssignment" id="defaultId" onClick="PopulateAssignmentData(this.id)">@DisplayText</button>';
   		$.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/Assignment.json',
		//url: 'http://localhost:85/Config/Assignment.json',
		method: 'GET',
		success: function (data) {
			  assignmentFields=data;
			  for(let filedata of assignmentFields) 
			  {
				  if (filedata.Display=="1")
				  {
					 rowToAdd=rowData.replace('defaultId',filedata.AssignmentRef);
					 rowToAdd=rowToAdd.replace('@DisplayText',filedata.AssignmentDisplayText);
					 $('#assignmentField').append(rowToAdd);
				  }

			  }				  
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
	
}

function PopulateAssignmentData(assignmentRef){
   let rowToAdd='';
   documentRef=assignmentRef;
   assignments=[];
   for(var i = 1;i<AssignmentJsonTable.rows.length;){
            AssignmentJsonTable.deleteRow(i);
        }
   let rowData='<tr onclick="getCurrentRowSelected(this)"><td><div contenteditable>@DisplayName</div></td><td><div contenteditable>@ContentURL</div></td><td><input type="checkbox"/></td></tr>';
   
   		$.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/AssignmentData.json',
		//url: 'http://localhost:85/Config/AssignmentData.json',
		method: 'GET',
		success: function (data) {
			  assignments=data;
			  for(let filedata of assignments) 
			  {  
		          if (assignmentRef==filedata.AssignmentRef)
				  {
				     rowToAdd=rowData.replace('@DisplayName',filedata.DisplayText);
				     rowToAdd=rowToAdd.replace('@ContentURL',filedata.ContentURL);
				     $('#AssignmentJsonTable tr:last').after(rowToAdd);
				  }

			  }				  
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
	
}

function PopulateFacultiesData(){
   let rowToAdd='';
   let faculties=[];
   for(var i = 1;i<FacultiesJsonTable.rows.length;){
            FacultiesJsonTable.deleteRow(i);
        }
   let rowData='<tr onclick="getCurrentRowSelected(this)"><td><div contenteditable>@facultyname</div></td><td><div contenteditable>@ContactNumber</div></td><td><div contenteditable>@Qualification</div></td><td><div contenteditable>@Designation</div></td><td><input type="checkbox"/></td></tr>';
   
   		$.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/FacultyData.json',
		//url: 'http://localhost:85/Config/FacultyData.json',
		method: 'GET',
		success: function (data) {
			  faculties=data;
			  for(let filedata of faculties) 
			  {
                 rowToAdd=rowData.replace('@facultyname',filedata.FacultyName);
				 rowToAdd=rowToAdd.replace('@ContactNumber',filedata.ContactNumber);
				 rowToAdd=rowToAdd.replace('@Qualification',filedata.Qualification);
				 rowToAdd=rowToAdd.replace('@Designation',filedata.Designation);
				 $('#FacultiesJsonTable tr:last').after(rowToAdd);
			  }				  
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
	
}

function PopulateVideoFileData(){
   let rowToAdd='';
   let VideoFileData=[];
   for(var i = 1;i<VideoJsonTable.rows.length;){
            VideoJsonTable.deleteRow(i);
        }
   let rowData='<tr><td><div contenteditable>@displayname</div></td><td><div contenteditable>@bucketname</div></td><td><div contenteditable>@display</div></td></tr>';
   
   		$.ajax({
		url: 'https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/Config/VideoFiles.json',
		//url: 'http://localhost:85/Config/VideoFiles.json',
		method: 'GET',
		success: function (data) {
			  VideoFileData=data;
			  for(let filedata of VideoFileData) 
			  {
                 rowToAdd=rowData.replace('@displayname',filedata.VideoDisplayName);
				 rowToAdd=rowToAdd.replace('@bucketname',filedata.VideoURL);
				 rowToAdd=rowToAdd.replace('@display',filedata.Display);
				 $('#VideoJsonTable tr:last').after(rowToAdd);
			  }				  
		},
		error: function () {
		   console.log('Error while calling Config service');
		}

	});
	
}
	
$(document).on('change', 'input[name=POPUPMessage]', function() {
	
     document.getElementById('FlshMsg').style.display = 'none';
	 document.getElementById('AdmssionEnqryMsg').style.display = 'none';
	 if($(this).val()=="FlashMessage")
	 {
		 document.getElementById('FlshMsg').style.display = 'block';
	 }
	 else if ($(this).val()=="AdmissionEnquiry")
	 {
		 document.getElementById('AdmssionEnqryMsg').style.display = 'block';
	 }
	 else if ($(this).val()=="AdmissionEnquiry")
	 {
		 document.getElementById('FlshMsg').style.display = 'none';
		 document.getElementById('AdmssionEnqryMsg').style.display = 'none';
	 }
});

function ConstructConfigHtmlFromObject(){
  document.getElementById('FlshMsg').style.display = 'none';
  document.getElementById('AdmssionEnqryMsg').style.display = 'none';
  
  document.getElementById('MsgHeading').value = messageHeading;
  document.getElementById('MsgBody').value = messageBody;
  document.getElementById('AdmissionMsgHeading').value = admissionMessage;
  
  document.getElementById("disablePOPUP").checked = true;
  document.getElementById("disableAdmissionEnquiry").checked = true;
  
  if(enableFlashMessage=="true")
  {
	  document.getElementById("FlashMessage").checked = true;
	  document.getElementById("enablePOPUP").checked = true;
      document.getElementById('FlshMsg').style.display = 'block';
  }
  else if (enableAdmissionPOPUP=="true")
  {
	  document.getElementById("AdmissionEnquiry").checked = true;
	  document.getElementById("enableAdmissionEnquiry").checked = true;
	  document.getElementById('AdmssionEnqryMsg').style.display = 'block';
  }
}

function OpenPreview(){
	
	  if (enableFlashMessage=="true") 
	  {
		document.getElementById("flashMessageHeading").innerHTML = messageHeading;
		document.getElementById("flashMessageBody").src = messageBody;
		$("#modalFlashMessage").modal();
	  }	
	  else if(enableAdmissionPOPUP=="true")
	  {
		document.getElementById("admissionMessage").innerHTML = admissionMessage;
		$("#modalRequest").modal();
	  }
}

function AddRowsImageJson(){

	  $('#ImageJsonTable tr:last').after('<tr><td><div contenteditable></div></td><td><div contenteditable></div></td><td><div contenteditable>1</div></td></tr>');
}

function AddRowsVideoJson(){

	  $('#VideoJsonTable tr:last').after('<tr><td><div contenteditable></div></td><td><div contenteditable></div></td><td><div contenteditable>1</div></td></tr>');
}

function AddRowsFacultiesJson(){

	  $('#FacultiesJsonTable tr:last').after('<tr onclick="getCurrentRowSelected(this)"><td><div contenteditable></div></td><td><div contenteditable></div></td><td><div contenteditable></div></td><td><div contenteditable></div></td><td><input type="checkbox"/></td></tr>');
}

function AddRowsAtLast(TableId){
	if(TableId=="AssignmentJsonTable")
	{
		$('#AssignmentJsonTable tr:last').after('<tr onclick="getCurrentRowSelected(this)"><td><div contenteditable></div></td><td><div contenteditable></div></td><td><input type="checkbox"/></td></tr>');
	}
	  
}

function getSelectedRows() {
	var selectedRows = []
	$('input[type=checkbox]').each(function () {
		if ($(this).is(":checked")) {
			selectedRows.push($(this));
		}
	});
	return selectedRows;
}
function deleteRows() {
	var selectedRows = getSelectedRows();
	for (var i = 0; i < selectedRows.length; i++) {
		$(selectedRows[i]).parent().parent().remove();
	}
}
 
function addRowsAtSpecificIndex(tableId) {
	if (tableId=="FacultiesJsonTable")
	{
		$("#" + tableId + " tr").eq(row_index).after('<tr onclick="getCurrentRowSelected(this)"><td><div contenteditable></div></td><td><div contenteditable></div></td><td><div contenteditable></div></td><td><div contenteditable></div></td><td><input type="checkbox"/></td></tr>');
	}
	else if (tableId=="AssignmentJsonTable")
	{
		$("#" + tableId + " tr").eq(row_index).after('<tr onclick="getCurrentRowSelected(this)"><td><div contenteditable></div></td><td><div contenteditable></div></td><td><input type="checkbox"/></td></tr>');
	}
	
}

function getCurrentRowSelected(x){
   row_index = x.rowIndex;
};

function OpenNewAssignmentModel()
{
	$("#modalCreateRemoveAssignment").modal();
}

function createNewAssignment()
{
let strDisplayText = "";

var date = new Date();
var strAssignmentRef =
  ("00" + (date.getMonth() + 1)).slice(-2) + 
  ("00" + date.getDate()).slice(-2) + 
  date.getFullYear() + 
  ("00" + date.getHours()).slice(-2) + 
  ("00" + date.getMinutes()).slice(-2) + 
  ("00" + date.getSeconds()).slice(-2);

strDisplayText=document.getElementById("txtcreateNewAssignment").value;

 var json ={
		   "AssignmentRef":strAssignmentRef,
		   "AssignmentDisplayText":strDisplayText,
		   "Display":"1"
			}
assignmentFields.push(json);			
var jsonString = JSON.stringify(assignmentFields);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/Assignment.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded a blob!');
  alert('data updated successfully!');
  $('#modalCreateRemoveAssignment').modal('hide');
  $('#assignmentField').html('');
  let rowData='<br/><button class="buttonAssignment" id="defaultId" onClick="PopulateAssignmentData(this.id)">@DisplayText</button>';
  for(let filedata of assignmentFields) 
  {
	 rowToAdd=rowData.replace('defaultId',filedata.AssignmentRef);
	 rowToAdd=rowToAdd.replace('@DisplayText',filedata.AssignmentDisplayText);
	 $('#assignmentField').append(rowToAdd);
  }	
  
});	
}

function DisableSelectedAssignment(bSelectedRemoveEntries=false)
{

let strAssignmentRef="";
let strDisplayText = "";
let strDisplay = "0";

let assignmentsFiltered = [];

for (let row of AssignmentsTable.rows) 
{
	if(row.rowIndex!=0)
	{ 
        if (row.cells[3].firstChild.checked==true)
		{
			for(let cell of row.cells) 
			{
			   if (cell.cellIndex==0)
			   {
				   strAssignmentRef=cell.innerText
			   }
			   else if(cell.cellIndex==1)
			   {
				   strDisplayText=cell.innerText
			   }
			   
			}
			
			var json ={
			   "AssignmentRef":strAssignmentRef,
			   "AssignmentDisplayText":strDisplayText,
			   "Display":strDisplay,
				}
				
			assignmentsFiltered.push(json);
		}

	}

}

for (let fileData of assignmentsFiltered) 
{
	assignmentFields = assignmentFields.filter(assignmnt => assignmnt.AssignmentRef !== fileData.AssignmentRef);
}

if(bSelectedRemoveEntries==false)
{
	for (let fileData of assignmentsFiltered) 
	{
		assignmentFields.push(fileData);
	}
}

var jsonString = JSON.stringify(assignmentFields);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/Assignment.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded a blob!');
  alert('data updated successfully!');
  $('#modalCreateRemoveAssignment').modal('hide');
  $('#assignmentField').html('');
  let rowData='<br/><button class="buttonAssignment" id="defaultId" onClick="PopulateAssignmentData(this.id)">@DisplayText</button>';
  for(let filedata of assignmentFields) 
  {  if (filedata.Display=="1")
	  {
		 rowToAdd=rowData.replace('defaultId',filedata.AssignmentRef);
		 rowToAdd=rowToAdd.replace('@DisplayText',filedata.AssignmentDisplayText);
		 $('#assignmentField').append(rowToAdd);
	  }
  }	
});

}


function createUpdateAssignmentData()
{
let strAssignmentRef="";
let strDisplayText = "";
let strContentURL = "";

let assignmentsFiltered = assignments.filter(assignmnt => assignmnt.AssignmentRef !== documentRef);

for (let row of AssignmentJsonTable.rows) 
{
	if(row.rowIndex!=0)
	{
		for(let cell of row.cells) 
		{
		   if (cell.cellIndex==0)
		   {
			   strDisplayText=cell.innerText
		   }
		   else if(cell.cellIndex==1)
		   {
			   strContentURL=cell.innerText
		   }
		   
		}
		
		var json ={
		   "AssignmentRef":documentRef,
		   "DisplayText":strDisplayText,
		   "ContentURL":strContentURL,
			}
			
		assignmentsFiltered.push(json);
	}

}

var jsonString = JSON.stringify(assignmentsFiltered);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/AssignmentData.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded a blob!');
  alert('data updated successfully!');
});	

}
		
function CreateAndUploadFacultiesJsonFile(){

let facultyname="";
let facultycontact = "";
let facultyqualification = "";
let facultydesignation = "";

var JsonObj=[];

for (let row of FacultiesJsonTable.rows) 
{
	if(row.rowIndex!=0)
	{
		for(let cell of row.cells) 
		{
		   if (cell.cellIndex==0)
		   {
			   facultyname=cell.innerText
		   }
		   else if(cell.cellIndex==1)
		   {
			   facultycontact=cell.innerText
		   }
		   else if(cell.cellIndex==2)
		   {
			   facultyqualification=cell.innerText
		   }
		   else if(cell.cellIndex==3)
		   {
			   facultydesignation=cell.innerText
		   }
		   
		}
		
		var json ={
		   "FacultyName":facultyname,
		   "ContactNumber":facultycontact,
		   "Qualification":facultyqualification,
		   "Designation":facultydesignation
			}
			
		JsonObj.push(json);
	}

}

var jsonString = JSON.stringify(JsonObj);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/FacultyData.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded a blob!');
  alert('data updated successfully!');
});

}

function CreateAndUploadImageGalleryJsonFile(){

let displayName = "";
let bktName = "";
let bdisplay = "";
var JsonObj=[];
for (let row of ImageJsonTable.rows) 
{
	if(row.rowIndex!=0)
	{
		for(let cell of row.cells) 
		{
		   if (cell.cellIndex==0)
		   {
			   displayName=cell.innerText
		   }
		   else if(cell.cellIndex==1)
		   {
			   bktName=cell.innerText
		   }
		   else if(cell.cellIndex==2)
		   {
			   bdisplay=cell.innerText
		   }
		   
		}
		
		var json ={
		   "DisplayName":displayName,
		   "BucketName":bktName,
		   "Display":bdisplay
			}
			
		JsonObj.push(json);
	}

}

var jsonString = JSON.stringify(JsonObj);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/ImageFiles.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded a blob!');
  alert('Image list published successfully');
});

}

function CreateAndUploadVideoGalleryJsonFile(){

let displayName = "";
let bktName = "";
let bdisplay = "";
var JsonObj=[];
for (let row of VideoJsonTable.rows) 
{
	if(row.rowIndex!=0)
	{
		for(let cell of row.cells) 
		{
		   if (cell.cellIndex==0)
		   {
			   displayName=cell.innerText
		   }
		   else if(cell.cellIndex==1)
		   {
			   bktName=cell.innerText
		   }
		   else if(cell.cellIndex==2)
		   {
			   bdisplay=cell.innerText
		   }
		   
		}
		
		var json ={
		   "VideoDisplayName":displayName,
		   "VideoURL":bktName,
		   "Display":bdisplay
			}
			
		JsonObj.push(json);
	}

}

var jsonString = JSON.stringify(JsonObj);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/VideoFiles.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded Video Json!');
  alert('Video list published successfully');
});

}

function CreateAndUploadJsonFile(){

if(document.getElementById("NoPOPUP").checked == true)
{
	enableFlashMessage="false";
	enableAdmissionPOPUP="false";
}
else if(document.getElementById("FlashMessage").checked == true)
{
	if(document.getElementById("enablePOPUP").checked == true)
	{
		enableFlashMessage="true";
	}
	else
	{
		enableFlashMessage="false";
	}
	messageHeading=document.getElementById("MsgHeading").value;
	messageBody=document.getElementById("MsgBody").value;
}
else if (document.getElementById("AdmissionEnquiry").checked == true)
{
	if(document.getElementById("enableAdmissionEnquiry").checked == true)
	{
		enableAdmissionPOPUP="true";
	}
	else
	{
		enableAdmissionPOPUP="false";
	}
	admissionMessage=document.getElementById("AdmissionMsgHeading").value;
}

var json ={
   "enableFlashMessage":enableFlashMessage,
   "messageHeading":messageHeading,
   "messageBody":messageBody,
   "enableAdmissionPOPUP":enableAdmissionPOPUP,
   "admissionMessage":admissionMessage  
}

var jsonString = JSON.stringify(json);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child("/Config/WebsiteConfig.json")

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded a blob!');
  alert('data updated successfully!');
});

}

function createImageBucket()
{
var JsonObj=[];
var sStorageFolder='';
var sbucketname=document.getElementById("txtnewbucket").value;
var sSelectedContentType='';
if(document.getElementById("GalleryImageUpload").checked == true)
{
   sStorageFolder='Images/' + sbucketname + '/info.txt';
   sSelectedContentType='GalleryImage';
}
else if (document.getElementById("AssignmentImageUpload").checked == true)
{
	sStorageFolder='Assignment/' + sbucketname + '/info.txt';
	sSelectedContentType='AssignmentImage';
}

var jsonString = JSON.stringify(JsonObj);
var blob = new Blob([jsonString], {type: "application/json"})

var storageRef = firebase.storage().ref();
var fileRef = storageRef.child(sStorageFolder)

 fileRef.put(blob).then(function(snapshot) {
  console.log('Uploaded Video Json!');
  alert('bucket created successfully!');
  loadImagebucketFolders(sSelectedContentType);
});
}


function uploadImageToSelectedBucket(){
   var sStorageFolder='';
   var e = document.getElementById("ImageFolders");
   var selectedBucket = e.options[e.selectedIndex].text;
   if(document.getElementById("GalleryImageUpload").checked == true)
   {
	   sStorageFolder='Images/' + selectedBucket + '/';
   }
   else if (document.getElementById("AssignmentImageUpload").checked == true)
   {
	  if (selectedBucket=='Default')
	  {
		 sStorageFolder='Assignment/';   
	  }
	  else
	  {
		 sStorageFolder='Assignment/' + selectedBucket + '/';
	  }	
   }
  //checks if files are selected
  if (files.length != 0) {
	//Loops through all the selected files
	for (let i = 0; i < files.length; i++) {
	  //create a storage reference
	  var storage = firebase.storage().ref(sStorageFolder + files[i].name);

	  //upload file
	  var upload = storage.put(files[i]);

	  //update progress bar
	  upload.on(
		"state_changed",
		function progress(snapshot) {
		  var percentage =
			(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		  document.getElementById("progress").value = percentage;
		},

		function error() {
		  alert("error uploading file");
		},

		function complete() {
		  document.getElementById(
			"uploading"
		  ).innerHTML += `${files[i].name} upoaded <br />`;
		}
	  );
	}
  } else {
	alert("No file chosen");
  }	
}

function selectAllImagesFromSelectedBucket(){
    
  var storage = firebase.storage();
  var storageRef = storage.ref();
  var i=0;
  var sFromStorageFolder='';
  
  var e = document.getElementById("ImageFolders");
  var value = e.value;
  var selectedBucket = e.options[e.selectedIndex].text;
  
  if (selectedBucket=='')
  {
	  alert('Please select bucket from dropdown');
	  return;
  }
  
  if(document.getElementById("GalleryImageUpload").checked == true)
  {
     sFromStorageFolder='Images/' + selectedBucket + '/';
  }
  else if (document.getElementById("AssignmentImageUpload").checked == true)
  {
	  if (selectedBucket=='Default')
	  {
         sFromStorageFolder='Assignment/';   
	  }
      else
	  {
         sFromStorageFolder='Assignment/' + selectedBucket + '/';
	  }		  	  
  }
  
  $('#List').find('tbody').html('');
  storageRef.child(sFromStorageFolder).listAll().then(function(result){
      result.items.forEach(function(imageRef)
	  {
			if(imageRef.name!="info.txt")
			{
				i++;
				displayImage(i,imageRef);
			}
	  });
	
});

}
function getLikableURL(downloadedURL)
{
let baseURL='https://storage.googleapis.com/kdpsgroup-2c331.appspot.com/';
let URLArray=downloadedURL.split("/o/");
let FileArray=URLArray[1].split("?");
let sFileURL=FileArray[0].replace('%2F','/')
sFileURL=sFileURL.replace('%2F','/');
return baseURL+sFileURL;
}

function displayImage(row,images)
{
   images.getDownloadURL().then(function(url){
           console.log(url);
		   let new_html='';
		   new_html +='<tr>';
		   new_html +='<td>';
		   new_html += row;
		   new_html +='</td>';
		   new_html +='<td>';
		   new_html += '<img class="preview" src="' + url + '" width="140px" height="250px" style="float:right;" >';
		   new_html +='</td>';
		   new_html +='<td>';
		   new_html += getLikableURL(url);
		   new_html +='</td>';
		   new_html +='</tr>';
		   
		  $('#List').find('tbody').append(new_html);
   });   

}

function loadImagebucketFolders(contentType="GalleryImage")
{

  var storage = firebase.storage();
  var storageRef = storage.ref();
  var i=0;
  var strImageFolderName='';
  var sParentFolder='';
  if (contentType=="GalleryImage")
  {
	  sParentFolder='Images/';
  }
  else if (contentType=="AssignmentImage")
  {
	  sParentFolder='Assignment/';
  }
  storageRef.child(sParentFolder).listAll().then(function(result){
      result.items.forEach(function(imageRef)
	  {
	    
		//i++;
		//displayImage(i,imageRef);
		//alert(imageRef);
		//imageFolders.push(folderRef.toString());
	  });
	 document.getElementById("ImageFolders").options.length = 0; 
	 result.prefixes.forEach((folderRef) => {
         //alert(folderRef.name);
		 strImageFolderName='<option value="optionValue"> optionText </option>';
		 strImageFolderName=strImageFolderName.replace('optionValue',folderRef.name);
		 strImageFolderName=strImageFolderName.replace('optionText',folderRef.name);
		 imageFolders.push(folderRef.name);
		 $('select').append(strImageFolderName);
      });
	  if (document.getElementById("ImageFolders").options.length==0)
	  {
		 strImageFolderName='<option value="optionValue"> optionText </option>';
		 strImageFolderName=strImageFolderName.replace('optionValue','Default');
		 strImageFolderName=strImageFolderName.replace('optionText','Default');
		 imageFolders.push('Default');
		 $('select').append(strImageFolderName);
	  }
	
});
  
}


function FileChangeEvent(e)
{
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
	console.log(files[i]);
  }
}

