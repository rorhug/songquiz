/*! angular-spotify 2014-09-17 */
!function(a,b){"use strict";var c={};b.module("spotify",[]).value("settings",c).provider("Spotify",function(){c.clientId=null,c.redirectUri=null,c.scope=null,c.accessToken=null,this.setClientId=function(a){return c.clientId=a,c.clientId},this.getClientId=function(){return c.clientId},this.setRedirectUri=function(a){return c.redirectUri=a,c.redirectUri},this.getRedirectUri=function(){return c.redirectUri},this.setScope=function(a){return c.scope=a,c.scope};var d={};d.toQueryString=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(encodeURIComponent(c)+"="+encodeURIComponent(a[c]));return b.join("&")},c.version="v1",c.apiBase="https://api.spotify.com/"+c.version,this.$get=["$q","$http","$window",function(e,f,g){function h(){this.clientId=c.clientId,this.redirectUri=c.redirectUri,this.apiBase=c.apiBase,this.scope=c.scope,this.accessToken=null,this.toQueryString=d.toQueryString}return h.prototype.api=function(a,b,c,d,g){var h=e.defer();return f({url:this.apiBase+a,method:b?b:"GET",params:c,data:d,headers:g}).success(function(a){h.resolve(a)}).error(function(a){h.reject(a)}),h.promise},h.prototype.search=function(a,b,c){return c=c||{},c.q=a,c.type=b,this.api("/search","GET",c)},h.prototype.getAlbum=function(a){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/albums/"+a)},h.prototype.getAlbums=function(a){return a=b.isString(a)?a.split(","):a,b.forEach(a,function(b,c){a[c]=b.indexOf("spotify:")>-1?b.split(":")[2]:b}),this.api("/albums","GET",{ids:a?a.toString():""})},h.prototype.getAlbumTracks=function(a,b){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/albums/"+a+"/tracks","GET",b)},h.prototype.getArtist=function(a){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/artists/"+a)},h.prototype.getArtists=function(a){return a=b.isString(a)?a.split(","):a,b.forEach(a,function(b,c){a[c]=b.indexOf("spotify:")>-1?b.split(":")[2]:b}),this.api("/artists/","GET",{ids:a?a.toString():""})},h.prototype.getArtistAlbums=function(a,b){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/artists/"+a+"/albums","GET",b)},h.prototype.getArtistTopTracks=function(a,b){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/artists/"+a+"/top-tracks","GET",{country:b})},h.prototype.getRelatedArtists=function(a){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/artists/"+a+"/related-artists")},h.prototype.getTrack=function(a){return a=-1===a.indexOf("spotify:")?a:a.split(":")[2],this.api("/tracks/"+a)},h.prototype.getTracks=function(a){return a=b.isString(a)?a.split(","):a,b.forEach(a,function(b,c){a[c]=b.indexOf("spotify:")>-1?b.split(":")[2]:b}),this.api("/tracks/","GET",{ids:a?a.toString():""})},h.prototype.getUserPlaylists=function(a,b){return this.api("/users/"+a+"/playlists","GET",b,null,{Authorization:"Bearer "+this.authToken})},h.prototype.getPlaylist=function(a,b,c){return this.api("/users/"+a+"/playlists/"+b,"GET",c,null,{Authorization:"Bearer "+this.authToken})},h.prototype.getPlaylistTracks=function(a,b,c){return this.api("/users/"+a+"/playlists/"+b+"/tracks","GET",c,null,{Authorization:"Bearer "+this.authToken})},h.prototype.createPlaylist=function(a,b){return this.api("/users/"+a+"/playlists","POST",null,b,{Authorization:"Bearer "+this.authToken,"Content-Type":"application/json"})},h.prototype.addPlaylistTracks=function(a,c,d,e){return d=b.isArray(d)?d:d.split(","),b.forEach(d,function(a,b){d[b]=-1===a.indexOf("spotify:")?"spotify:track:"+a:a}),this.api("/users/"+a+"/playlists/"+c+"/tracks","POST",{uris:d.toString(),position:e?e.position:null},null,{Authorization:"Bearer "+this.authToken,"Content-Type":"application/json"})},h.prototype.removePlaylistTracks=function(a,c,d){d=b.isArray(d)?d:d.split(",");var e;return b.forEach(d,function(a,b){e=d[b],d[b]={uri:-1===e.indexOf("spotify:")?"spotify:track:"+e:e}}),this.api("/users/"+a+"/playlists/"+c+"/tracks","DELETE",null,{tracks:d},{Authorization:"Bearer "+this.authToken,"Content-Type":"application/json"})},h.prototype.replacePlaylistTracks=function(a,c,d){d=b.isArray(d)?d:d.split(",");var e;return b.forEach(d,function(a,b){e=d[b],d[b]=-1===e.indexOf("spotify:")?"spotify:track:"+e:e}),this.api("/users/"+a+"/playlists/"+c+"/tracks","PUT",{uris:d.toString()},null,{Authorization:"Bearer "+this.authToken,"Content-Type":"application/json"})},h.prototype.updatePlaylistDetails=function(a,b,c){return this.api("/users/"+a+"/playlists/"+b,"PUT",null,c,{Authorization:"Bearer "+this.authToken,"Content-Type":"application/json"})},h.prototype.getUser=function(a){return this.api("/users/"+a)},h.prototype.getCurrentUser=function(){return this.api("/me","GET",null,null,{Authorization:"Bearer "+this.authToken})},h.prototype.getSavedUserTracks=function(a){return this.api("/me/tracks","GET",a,null,{Authorization:"Bearer "+this.authToken})},h.prototype.userTracksContains=function(a){return a=b.isString(a)?a.split(","):a,b.forEach(a,function(b,c){a[c]=b.indexOf("spotify:")>-1?b.split(":")[2]:b}),this.api("/me/tracks/contains","GET",{ids:a.toString()},null,{Authorization:"Bearer "+this.authToken})},h.prototype.saveUserTracks=function(a){return a=b.isString(a)?a.split(","):a,b.forEach(a,function(b,c){a[c]=b.indexOf("spotify:")>-1?b.split(":")[2]:b}),this.api("/me/tracks","PUT",{ids:a.toString()},null,{Authorization:"Bearer "+this.authToken})},h.prototype.removeUserTracks=function(a){return a=b.isString(a)?a.split(","):a,b.forEach(a,function(b,c){a[c]=b.indexOf("spotify:")>-1?b.split(":")[2]:b}),this.api("/me/tracks","DELETE",{ids:a.toString()},null,{Authorization:"Bearer "+this.authToken,"Content-Type":"application/json"})},h.prototype.setAuthToken=function(a){return this.authToken=a,this.authToken},h.prototype.login=function(){function b(a){l&&l.close(),d.setAuthToken(a.data),c.resolve(a.data)}var c=e.defer(),d=this,f=400,h=500,i=screen.width/2-f/2,j=screen.height/2-h/2,k={client_id:this.clientId,redirect_uri:this.redirectUri,scope:this.scope||"",response_type:"token"},l=a.open("https://accounts.spotify.com/authorize?"+this.toQueryString(k),"Spotify","menubar=no,location=no,resizable=no,scrollbars=no,status=no,width="+f+",height="+h+",top="+j+",left="+i);return g.addEventListener("message",b,!1),c.promise},new h}]})}(window,angular);