module.exports = function trim_string( passedString, startstring, endstring ) {
  var theString = passedString.substring( startstring, endstring );

  if ( theString.length === endstring ) {
    theString = theString + '...';
  }

  return String(theString).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
