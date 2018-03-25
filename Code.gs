function doGet(e) {
    var name = e.parameters['folderName'];
    var bookmarks = e.parameters['bookmarkUrls'];
  
    // Get the BookmarkNetwork Folder
    var folders = DriveApp.getFoldersByName('BookmarkNetwork');
    while (folders.hasNext()) {
        var folder = folders.next();
    }
  
    // Create a new doc
    var doc = DocumentApp.create(name[0]);
    var docFile = DriveApp.getFileById( doc.getId() );
    docFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); 
    folder.addFile(docFile);
    DriveApp.getRootFolder().removeFile(docFile);
  
    // Edit doc
    var body = doc.getBody();
  
    for(var i=0; i<bookmarks.length; i++) {
        body.appendListItem(bookmarks[i]);
    }
    
    var result = {
      docUrl: doc.getUrl()
    }
    
    return ContentService.createTextOutput(JSON.stringify(result));
}