### CREATE DATABASE

CREATE DATABASE ultrass;

### CRETE TABLE ADMIN

CREATE TABLE admin (
admin_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
admin_mail varchar(255) NOT NULL,
admin_pass varchar(255) NOT NULL
);

### CREATE TABLE ADMIN_ARTICLES

CREATE TABLE admin_articles (
article_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
article_unique_id bigint(20) NOT NULL,
article_title varchar(200) NOT NULL,
place_town varchar(100) NOT NULL,
article_desc varchar(1000) NOT NULL,
article_imgs varchar(400) NOT NULL,
date varchar(100) NOT NULL,
likes bigint(20) NOT NULL
);

### CREATE TABLE ADMIN_IMAGES

CREATE TABLE admin_images (
image_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
image_unique_id bigint(20) NOT NULL,
image_title varchar(200) NOT NULL,
place_town varchar(100) NOT NULL,
image_desc varchar(1000) NOT NULL,
image_src varchar(400) NOT NULL,
date varchar(100) NOT NULL,
likes bigint(20) NOT NULL
);

### CREATE TABLE ADMIN_VIDEOS

CREATE TABLE admin_videos (
video_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
video_unique_id bigint(20) NOT NULL,
video_title varchar(200) NOT NULL,
video_desc varchar(1000) NOT NULL,
video_src varchar(400) NOT NULL,
date varchar(100) NOT NULL,
likes bigint(20) NOT NULL,
top_ten varchar(50) NOT NULL,
place_town varchar(100) NOT NULL
);

### CREATE TABLE ARTICLES

CREATE TABLE articles (
article_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
article_unique_id bigint(20) NOT NULL,
article_title varchar(255) NOT NULL,
article_date_add varchar(100) NOT NULL,
the_article varchar(1000) NOT NULL,  
 likes bigint(20) NOT NULL,
member_created_art varchar(100) NOT NULL
);

### CREATE TABLE BLOG_COMMENTS

CREATE TABLE blog_comments (
comment_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
commentowner_id varchar(100) NOT NULL,
commenttarget_id varchar(255) NOT NULL,
the_comment varchar(1000) NOT NULL,  
 comment_date varchar(100) NOT NULL
);

### CREATE TABLE COMMENTS

CREATE TABLE comments (
comment_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
commentowner_id varchar(100) NOT NULL,
commenttarget_id varchar(255) NOT NULL,
the_comment varchar(1000) NOT NULL,  
comment_date varchar(100) NOT NULL
);

### CREATE TABLE MEDIA

CREATE TABLE media (
media_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
media_title varchar(255) NOT NULL,
media_date_aded varchar(100) NOT NULL,
media_description varchar(255) NOT NULL,
media_likes bigint(20) NOT NULL,
media_comments varchar(255) NOT NULL,
the_media varchar(400) NOT NULL  
);

### CREATE TABLE MEMBERS

CREATE TABLE members (
member_id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
member_unique_id bigint(20) NOT NULL,
member_name varchar(255) NOT NULL,
member_mail varchar(255) NOT NULL,
member_pass varchar(255) NOT NULL,
member_img varchar(400) NOT NULL  
);
