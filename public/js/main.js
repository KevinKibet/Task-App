
$(document).ready(()=>{
	$('.delete-task').on('click', (e)=>{
		$target = $(e.target);
		const id = $target.attr('data-id');
		$.ajax({
			type:'DELETE',
			url:'/task/delete/'+id,
			success:(response)=>{
				alert('Deleting the Task');
				window.location.href='/';
			},
			error:(error)=>{
				console.log(error);
			}
		})
	})
})