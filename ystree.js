/**
ysTree by oys
**/

var ysTree = {
	csv2Json: function(csv){
		var lines=csv.split("\n");
		var result = [];
		var headers=lines[0].split(",");
		for(var i=1;i<lines.length;i++){
			var obj = {};
			var currentline=lines[i].split(",");
			//if(lines[i]==)
			if(lines[i]==''){
				continue;
			};
			for(var j=0;j<headers.length;j++){
				obj[headers[j]] = currentline[j];
			}
			result.push(obj);
		}
		return result;
	},
	renderTree: function(data){
		var treeWrap = $('#ysTree');
		treeWrap.addClass('ystree');
		var jsonData = ysTree.csv2Json(data);
		var treeNode = $("<ul></ul>");
		var treeTxt = '';
		for(var i=0;i<jsonData.length;i++){
			treeNode.append($("<li></li>").attr({'id':'ystree-'+jsonData[i].id, 'data-parent':jsonData[i].parent}));
			if(jsonData[i].link == ''){
				treeTxt = "<span class='ystree-icon'></span><span class='ystree-link' href='" + jsonData[i].link + "' target='_blank'>" + jsonData[i].url + "</span>";
			}else{
				treeTxt = "<span class='ystree-icon'></span><a class='ystree-link' href='" + jsonData[i].link + "' target='_blank'>" + jsonData[i].url + "</a>";
			}
			if(jsonData[i].count != 0 ){treeTxt += 	"<span class='ystree-cnt'>(" + jsonData[i].count + ")</span>"}
			treeNode.find('#ystree-'+jsonData[i].id).html(treeTxt);
		}
		treeWrap.empty();
		treeWrap.append(treeNode).promise().done(function(){
			var thisId;
			treeWrap.find('li').each(function(){
				//$(this).appendTo('#ysTree2');
				thisId = $(this).attr('data-parent');
				if($(this).attr('data-parent') != '0'){
					if($('#ystree-'+thisId).has('ul').length){
						$(this).appendTo('#ystree-'+thisId+' ul:first');
					}else{
						$('#ystree-'+thisId).addClass('ystree-folder');
						$('#ystree-'+thisId).append($("<a></a>").attr({'class':'ystree-show'})).append("<ul></ul>");
						$(this).appendTo('#ystree-'+thisId+' ul:first');
					}
				}
			})
		});
		// treeNode.html(treeList);
		treeWrap.find('ul').each(function(){
			$(this).find('li:last-child').addClass('ystree-last');
		});
		$('#ysTree .ystree-show').click(function(){
			$(this).parent('li').toggleClass('ystree-opened');
		});
	},
	loadByStr: function(id){
		ysTree.renderTree($('#'+id).val());
	},
	loadByCSV: function(file){
		$.ajax({
	        type: "GET",
	        url: file,
	        dataType: "text",
	        success: function(data) {ysTree.renderTree(data);}
	     });
	}

};
