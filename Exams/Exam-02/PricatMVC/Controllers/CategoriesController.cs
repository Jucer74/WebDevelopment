using Microsoft.AspNetCore.Mvc;
using PricatMVC.Models;
using PricatMVC.Services;

namespace PricatMVC.Controllers
{
    public class CategoriesController : Controller
    {
        private static int numCategories;

        private static CategoryService _categoryService;

        public CategoriesController(CategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        // GET: CategoriesController
        public async Task<ActionResult> Index()
        {
            List<Category> categories = await _categoryService.GetAll();
            return View(categories);
        }

        // GET: CategoriesController/Details/5
        public async Task<ActionResult> Details(int id)
        {
            Category category = await _categoryService.GetById(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // GET: CategoriesController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CategoriesController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Category category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Category categories = await _categoryService.CreateCategory(category);
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: CategoriesController/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            Category category = await _categoryService.GetById(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        // POST: CategoriesController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Category category)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Category categoryFound = await _categoryService.GetById(category.Id);

                    if (categoryFound == null)
                    {
                        return View();
                    }

                    Category categoryUpdated = await _categoryService.EditCategory(categoryFound.Id, category);


                    return RedirectToAction(nameof(Index));
                }

                return View(category);
            }
            catch
            {
                return View();
            }
        }

        // GET: CategoriesController/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            Category categoryFound = await _categoryService.GetById(id);

            if (categoryFound == null)
            {
                return NotFound();
            }

            return View(categoryFound);
        }

        // POST: CategoriesController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(Category category)
        {
            try
            {
                Category categoryFound = await _categoryService.GetById(category.Id);

                if (categoryFound == null)
                {
                    return View();
                }

                await _categoryService.DeleteCategory(categoryFound.Id);


                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
