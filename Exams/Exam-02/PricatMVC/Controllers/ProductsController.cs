using Microsoft.AspNetCore.Mvc;
using PricatMVC.Models;
using PricatMVC.Services;

namespace PricatMVC.Controllers
{
    public class ProductsController : Controller
    {
        private static List<Product> productList = null!;
        private static int numProducts;

        private static ProductService _productService;

        public ProductsController(ProductService productService)
        {
            _productService = productService;
        }

        // GET: ProductsController
       public async Task<ActionResult> Index()
        {
            List<Product> products = await _productService.GetAll();
            return View(products);
        }

        // GET: ProductsController/categories/5
        [Route("ProductsController/{id:int}")]
        public async Task<ActionResult> ProductByCategory(int id)
        {
            List<Product> products = await _productService.GetAllByCategoryId(id);
            return View(products);
        }

        // GET: ProductsController/Details/5
        public async Task<ActionResult> Details(int id)
        {
            Product product = await _productService.GetById(id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }

        // GET: ProductsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ProductsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Create(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Product products = await _productService.CreateProduct(product);
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductsController/Edit/5
        public async Task<ActionResult> Edit(int id)
        {
            Product product = await _productService.GetById(id);

            if (product == null)
            {
                return NotFound();
            }

            return View(product);
        }
        // POST: ProductsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(Product product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    Product productFound = await _productService.GetById(product.Id);

                    if (productFound == null)
                    {
                        return View();
                    }

                    Product productUpdated = await _productService.EditProduct(productFound.Id, product);


                    return RedirectToAction(nameof(Index));
                }

                return View(product);
            }
            catch
            {
                return View();
            }
        }

        // GET: ProductsController/Delete/5
        public async Task<ActionResult> Delete(int id)
        {
            Product productFound = await _productService.GetById(id);

            if (productFound == null)
            {
                return NotFound();
            }

            return View(productFound);
        }

        // POST: ProductsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Delete(Product product)
        {
            try
            {
                Product productFound = await _productService.GetById(product.Id);

                if (productFound == null)
                {
                    return View();
                }

                await _productService.DeleteProduct(productFound.Id);


                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
