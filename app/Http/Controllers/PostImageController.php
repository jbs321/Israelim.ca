<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostImageUploadRequest;
use App\Post;
use App\PostImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class PostImageController extends Controller
{
    public function saveImages(PostImageUploadRequest $request, Post $post)
    {
        $savedImages = [];
        $user = Auth::user();
        $numFiles = $request->num_photos;

        $existingImages = PostImage::all()
            ->where(PostImage::FIELD__USER_ID, $user->id)
            ->where(PostImage::FIELD__POST_ID, $post->id);

        for ($i = 0; $i < $numFiles; $i++) {
            $photo     = $request->file("photo$i");
            $extension = $photo->getClientOriginalExtension();

            $fileName = implode("_", [
                    $user->id,
                    $post->id,
                    $existingImages->count() + $i
                ]) . "." . $extension;

            $isSaved = $photo->storeAs("/public/photos/posts", $fileName);

            if ($isSaved) {
                $postImage = new PostImage();
                $postImage[PostImage::FIELD__POST_ID] = $post->id;
                $postImage[PostImage::FIELD__USER_ID] = $user->id;
                $postImage[PostImage::FIELD__EXTENSION] = $extension;
                $postImage[PostImage::FIELD__NAME] = $fileName;
                $postImage[PostImage::FIELD__WIDTH] = getimagesize($photo)[0];
                $postImage[PostImage::FIELD__HEIGHT] = getimagesize($photo)[1];
                $postImage[PostImage::FIELD__PATH] = "/storage/photos/posts/$fileName";
                $postImage->save();

                $savedImages[] = $postImage;
            }
        }

        return new JsonResponse($savedImages);
    }
}
