<?php

// delete the "read more..." wordpress button
function excerpt_read_more_link($more) {
    global $post;
    return '';
}

add_filter('excerpt_more', 'excerpt_read_more_link');
//

?>

