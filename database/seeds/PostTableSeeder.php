<?php

use Illuminate\Database\Seeder;
use App\Post;
use App\Category;

class PostTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();

        for ($i = 0; $i < 50; $i++) {
            $post              = new Post();
            $post->{Post::FIELD__USER_ID}     = 1;
            $post->{Post::FIELD__CONTENT} = $faker->randomHtml();
            $post->save();

            for ($j = 0; $j < 3; $j++) {
                $ctg = new Category();
                $ctg->{Category::FIELD__USER_ID} = 1;
                $ctg->{Category::FIELD__POST_ID} = $post->id;
                $ctg->{Category::FIELD__CONTENT} = "$j: $faker->word";
                $ctg->save();
            }
        }
    }
}
