var num_total_blog = 392;
var num_blog_per_page = 10;
var current_page_num = 1;

jQuery(document).ready(function(){
	create_one_page_blog_preview();
})


jQuery(document).ready(function(){
	$('div.module_blog').on('click', "a.single_page_block", function() {
		current_page_num = this.id;
		create_one_page_blog_preview(); 
	} );	
})

pad_zeros = function(num) {
	var blog_ind_digit = 4;
    var s = num+"";
    while (s.length < blog_ind_digit) s = "0" + s;
    return s;
}

add_one_blog_post_preview = function(blog_path){
	var year, month, day, title, content ;
	jQuery.ajax({
		url: blog_path,
		dataType: 'html',
		success: function(data){
			var postObj = jQuery(data);
			month = postObj.find('span.box_month').text();
			day = postObj.find('span.box_day').text();
			year = postObj.find('div.listing_meta').find('span:first-child').text();
			title = postObj.find('h3.blogpost_title').text();
			content = postObj.find('article.contentarea').text();
			content = content.substring(0,400);
			content += ' ...  <a class = "readmore" href = " '+blog_path + '"> READ MORE </a>'
		},
		async : false
	})


	jQuery.ajax({
		url: 'blog_preview_template.html',
		dataType: 'html',
		success: function(data){
			var jqObj = jQuery(data)
			jqObj.find('span.box_month').text(month);
			jqObj.find('span.box_day').text(day);
			jqObj.find('div.listing_meta').find('span').text(year);
			jqObj.find('h3.blogpost_title').html('<a href = "'+blog_path+'">'+title+'</a>');
			jqObj.find('article.contentarea').html(content);
			$('div.module_blog').append(jqObj);
		},
		async : false
	})
}

create_one_page_blog_preview = function(){
	$('div.module_blog').empty()
	var start_blog_num = (num_total_blog-1) - num_blog_per_page * (current_page_num-1)
	var end_blog_num = Math.max(start_blog_num - num_blog_per_page , 0);
	for(i=start_blog_num; i>end_blog_num; i--){
		var bp = 'blogs/blog_post_' + pad_zeros(i) + '.html';
		add_one_blog_post_preview(bp);
	}
	add_blog_page_blocks()
}

add_blog_page_blocks = function(){
	var	num_pages = Math.ceil(num_total_blog/num_blog_per_page)
	var code = '<ul class="pagerblock">'
	for (var i=1; i<=num_pages; i++){
		if (i==current_page_num){
			code += '<li><a class="single_page_block current" id="'+i+'"  href=#>' + i + '</a></li>';
		}else{
			code += '<li><a class="single_page_block" id="'+i+'" href=#>' + i + '</a></li>';
		}
	}
	code += '</ul>';
	$('div.module_blog').append(code);
}



