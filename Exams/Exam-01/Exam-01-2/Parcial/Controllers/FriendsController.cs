using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Parcial.Models;


namespace Parcial.Controllers
{
    public class FriendsController : Controller
    {

        private static List<Friend> friendsList = LoadFriends();

        // GET: StudentsController
        public ActionResult Index()
        {
            return View(friendsList);
        }

        // GET: StudentsController/Details/5
        public ActionResult Details(int id)
        {
            var friend = friendsList.FirstOrDefault(x => x.Id == id);
            return View(friend);
        }


        // GET: StudentsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: StudentsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Friend nuevaFriend)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    nuevaFriend.Id = friendsList.Max(p => p.Id) + 1;
                    friendsList.Add(nuevaFriend);
                    return RedirectToAction(nameof(Index));
                }
                return View(nuevaFriend);
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Edit/5
        public ActionResult Edit(int id)
        {
            var friend = friendsList.FirstOrDefault(x => x.Id == id);
            return View(friend);
        }

        // POST: StudentsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Friend friendEditada)
        {
            try
            {
                var friendExistente = friendsList.FirstOrDefault(p => p.Id == id);

                if (friendExistente != null && ModelState.IsValid)
                {
                    // Actualizar los campos de la persona existente con los valores editados
                    friendExistente.PhotoPath = friendEditada.PhotoPath;
                    friendExistente.UserEmail = friendEditada.UserEmail;
                    friendExistente.FirstName = friendEditada.FirstName;
                    friendExistente.LastName = friendEditada.LastName;
                    friendExistente.DateOfBirth = friendEditada.DateOfBirth;
                    friendExistente.Sex = friendEditada.Sex;

                    return RedirectToAction(nameof(Index));
                }

                return View(friendEditada);
            }
            catch
            {
                return View();
            }
        }

        // GET: StudentsController/Delete/5
        public ActionResult Delete(int id)
        {
            var friend = friendsList.FirstOrDefault(x => x.Id == id);
            return View(friend);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var friendToDelete = friendsList.FirstOrDefault(x => x.Id == id);
            _ = friendsList.Remove(friendToDelete);

            // Reenumerar los IDs para mantener el orden
            for (int i = 0; i < friendsList.Count; i++)
            {
                friendsList[i].Id = i + 1;
            }

            return RedirectToAction(nameof(Index));
        }


        public static List<Friend> LoadFriends()
        {
            var friend = new List<Friend>();

            friend.Add(new Friend()
            {
                Id = 1,
                PhotoPath = "Barry_Allen.png",
                UserEmail = "correo1@example.com",
                FirstName = "Barry",
                LastName = "Allen",
                DateOfBirth = new DateTime(1989, 1, 8),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 2,
                PhotoPath = "Bruce_Wayne.png",
                UserEmail = "correo1@example.com",
                FirstName = "Bruce",
                LastName = "Wayne",
                DateOfBirth = new DateTime(1975, 4, 7),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 3,
                PhotoPath = "Enrico_Pucci.png",
                UserEmail = "correo1@example.com",
                FirstName = "Enrico",
                LastName = "Pucci",
                DateOfBirth = new DateTime(1972, 6, 5),
                Sex = 'M'
            });


            friend.Add(new Friend()
            {
                Id = 4,
                PhotoPath = "Tsuna_Sawada.png",
                UserEmail = "correo1@example.com",
                FirstName = "Tsunayoshi",
                LastName = "Sawada",
                DateOfBirth = new DateTime(2006, 10, 6),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 5,
                PhotoPath = "Dick_Grayson.png",
                UserEmail = "correo1@example.com",
                FirstName = "Dick",
                LastName = "Grayson",
                DateOfBirth = new DateTime(1996, 12, 1),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 6,
                PhotoPath = "Peter_Parker.png",
                UserEmail = "correo1@example.com",
                FirstName = "Peter",
                LastName = "Parker",
                DateOfBirth = new DateTime(2002, 10, 10),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 7,
                PhotoPath = "Diana_Prince.png",
                UserEmail = "correo1@example.com",
                FirstName = "Diana",
                LastName = "Prince",
                DateOfBirth = new DateTime(1974, 10, 8),
                Sex = 'F'
            });
            friend.Add(new Friend()
            {
                Id = 8,
                PhotoPath = "Gwen_Stacy.png",
                UserEmail = "correo1@example.com",
                FirstName = "Gwen",
                LastName = "Stacy",
                DateOfBirth = new DateTime(1977, 2, 4),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 9,
                PhotoPath = "Miles_Morales.png",
                UserEmail = "correo1@example.com",
                FirstName = "Miles",
                LastName = "Morales",
                DateOfBirth = new DateTime(2006, 11, 7),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 10,
                PhotoPath = "Barbara_Gordon.png",
                UserEmail = "correo1@example.com",
                FirstName = "Barbara",
                LastName = "Gordon",
                DateOfBirth = new DateTime(1998, 9, 9),
                Sex = 'M'
            });
            return friend;
        }


        }
    }
