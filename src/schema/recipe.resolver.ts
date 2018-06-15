import { Resolver, Query } from 'type-graphql';
import { Recipe } from './recipe.type';

@Resolver(Recipe)
export class RecipeResolver {
    @Query(returns => Recipe)
    public recipe() {
        const recipe = new Recipe();

        recipe.id = '123';
        recipe.creationDate = new Date();
        recipe.description = 'Test';
        recipe.ingredients = ['Water', 'Sugar'];
        recipe.title = 'Suger Water';

        return recipe;
    }
}
