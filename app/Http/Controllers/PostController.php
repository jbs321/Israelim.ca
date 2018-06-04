<?php

namespace App\Http\Controllers;

use App\Category;
use App\Http\Requests\PostRequest;
use App\Post;
use App\PostImage;
use App\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function findAllByUser()
    {
        /** @var User $user */
        $user = Auth::user();
        $posts = $user->posts()->with(Category::PLURAL)->with(PostImage::PLURAL);
        $pagination = $posts->paginate(5);

        return new JsonResponse($pagination);
    }

    public function findByPost(Post $post)
    {
        $post->categories;
        $post->postImages;

        return new JsonResponse($post);
    }

    public function store(PostRequest $request)
    {
        $user = Auth::user();
        $post = new Post();
        $post->fill($request->all());
        $post->user_id = $user->id;
        $post->save();

        //handle Category relationship
        if (isset($request->categories)) {
            $categories = $request->categories;

            $categories = array_map(function (string $category) use ($post, $user) {
                $cat = new Category();
                $cat[Category::FIELD__POST_ID] = $post->id;
                $cat[Category::FIELD__USER_ID] = $user->id;
                $cat[Category::FIELD__CONTENT] = $category;

                return $cat;
            }, $categories);

            $post->categories()->saveMany($categories);
        }

        $post->categories;
        $post->postImages;

        return new JsonResponse($post);
    }

    public function update(PostRequest $request, Post $post)
    {
        $user = Auth::user();
        $post->fill($request->all());
        $post->save();

        if (isset($request->categories)) {
            $categories = $request->categories;

            $post->categories()->delete();

            $categories = array_map(function (string $category) use ($post, $user) {
                $cat = new Category();
                $cat[Category::FIELD__POST_ID] = $post->id;
                $cat[Category::FIELD__USER_ID] = $user->id;
                $cat[Category::FIELD__CONTENT] = $category;

                return $cat;
            }, $categories);

            $post->categories()->saveMany($categories);
        }

        $post->categories;
        $post->postImages;

        return new JsonResponse($post);
    }

    public function destroy(Post $post)
    {
        $post->categories()->delete();
        $post->delete();

        return new JsonResponse($post);
    }
}

