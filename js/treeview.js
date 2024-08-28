$(function () {
    $('.sidebar-menu li:not(.treeview) > a').on('click', function () {    // onclick events
        var $parent = $(this).parent().addClass('active');
        // $parent.siblings('.treeview.active').find('> a').trigger('click');
        $parent.siblings().removeClass('active').find('li').removeClass('active');
        $parent.closest('.treeview').addClass('active');
        $parent.closest('.treeview').siblings().removeClass('active');
    });
    $('.sidebar-menu a').each(function () {    // activate the li of current page after loaded DOMs
        if (this.href === window.location.href) {
            $(this).parent().addClass('active')
                .closest('.treeview-menu').addClass('.menu-open')
                .closest('.treeview').addClass('active');
        }
    });
});