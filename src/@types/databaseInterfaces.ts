import { SexType } from "@prisma/client";

export interface InstagramPostCreateInterface {
  id: string;
  postUrl: string;
  description: string;
  commentCount: number;
  likeCount: number;
  pubDate: Date;
  viewCount: number;
  username: string;
  imgUrl: string;
  postId: string;
  politician_id: string;
  playCount: number;
}

export interface YoutubeCommentCreateInterface {
  id: string;
  text: string;
  likeCount: number;
  replyCount: number;
  author: string;
  video_id: string;
  sentimentAnalysis: number;
}

export interface YoutubeVideoCreateInterface {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  date: Date;
  imgUrl: string;
  viewCount: number;
  commentsCount: number;
  likes: number;
  politician_id: string;
}

export interface YoutubeBaseDataCreateInterface {
  channel_name: string;
  channel_total_views: number;
  channel_total_subs: number;
  channel_total_videos: number;
  date: Date;
  id: string;
  politician_id: string;
}

export interface FacebookPostCommentsCreateInterface {
  id: string;
  postUrl: string;
  text: string;
  likeCount: number;
  date: Date;
  username: string;
  post_id: string;
  authorGender: SexType;
  sentimentAnalysis: number;
}

export interface FacebookPostCommentsCreateInterface {
  id: string;
  text: string;
  likeCount: number;
  replies: number;
  postUrl: string;
  date: Date;
  username: string;
  author: string;
  post_id: string;
  sentimentAnalysis: number;
  created_at: Date;
}

export interface TiktokCommentsCreateInterface {
  id: string;
  diggCount: number;
  date: Date;
  replyCount: number;
  text: string;
  author: string;
  video_id: string;
  sentimentAnalysis: number;
}

export interface TiktokVideoCreateInterface {
  politician_id: string;
  id: string;
  text: string;
  diggCount: number;
  date: Date;
  shareCount: number;
  commentCount: number;
  playCount: number;
  url: string;
}

export interface FacebookPostCreateInterface {
  id: string;
  text: string;
  url: string;
  date: Date;
  like: number;
  shares: number;
  comments: number;
  thumbnail: string;
  politician_id: string;
}

export interface InstagramCommentCreateInterface {
  id: string;
  text: string;
  ownerProfilePicUrl: string;
  post_id: string;
  ownerUsername: string;
  timestamp: Date;
  likeCount: number;
  sentimentAnalysis: number;
}

export interface GptCommentDataInterface {
  text: string;
  id: string;
  username?: string;
  ownerUsername?: string;
  author?: string;
}

export interface GptCommentResponseInterface {
  id: string;
  sentimentAnalysis: number;
  authorGender: SexType;
}

export interface TiktokBaseDataCreateInterface {
  fans: number;
  videos: number;
  verified: boolean;
  avatar: string;
  heart: number;
  politician_id: string;
}

export interface InstagramBaseDataCreateInterface {
  politician_id: string;
  followers: number;
  follows: number;
  posts_count: number;
  reels_count: number;
  business: boolean;
  verified: boolean;
  biography: string;
  url: string;
  fullName: string;
  profilePicture: string;
}

export interface FacebookBaseDataCreateInterface {
  likes_count: number;
  title: string;
  followers_count: number;
  politician_id: string;
}
