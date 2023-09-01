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
            if (friend == null) 
            { 
                return RedirectToAction(nameof(Index));
            }
            return View(friend);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            var friend = friendsList.Find(x => x.Id == id);
            if(friend != null)
            {
                friendsList.Remove(friend);
            }

            return RedirectToAction(nameof(Index));
        }


        public static List<Friend> LoadFriends()
        {
            var friend = new List<Friend>();

            friend.Add(new Friend()
            {
                Id = 1,
                PhotoPath = "Tsuna_Sawada.png",
                UserEmail = "correo1@example.com",
                FirstName = "Tsunayoshi",
                LastName = "Sawada",
                DateOfBirth = new DateTime(2006, 10, 14),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 2,
                PhotoPath = "Hayato_Gokudera.png",
                UserEmail = "correo1@example.com",
                FirstName = "Hayato",
                LastName = "Gokudera",
                DateOfBirth = new DateTime(2006, 9, 9),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 3,
                PhotoPath = "Takeshi_Yamamoto.png",
                UserEmail = "correo1@example.com",
                FirstName = "Takeshi",
                LastName = "Yamamoto",
                DateOfBirth = new DateTime(2006, 4, 24),
                Sex = 'M'
            });


            friend.Add(new Friend()
            {
                Id = 4,
                PhotoPath = "Lambo_Bovino.png",
                UserEmail = "correo1@example.com",
                FirstName = "Lambo",
                LastName = "Bovino",
                DateOfBirth = new DateTime(2006, 5, 28),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 5,
                PhotoPath = "Kyoya_Hibari.png",
                UserEmail = "correo1@example.com",
                FirstName = "Kyoya",
                LastName = "Hibari",
                DateOfBirth = new DateTime(2006, 5, 5),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 6,
                PhotoPath = "Ryohei_Sasagawa.png",
                UserEmail = "correo1@example.com",
                FirstName = "Ryohei",
                LastName = "Sasagawa",
                DateOfBirth = new DateTime(2006, 8, 26),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 7,
                PhotoPath = "Chrome_Dokuro.png",
                UserEmail = "correo1@example.com",
                FirstName = "Chrome",
                LastName = "Dokuro",
                DateOfBirth = new DateTime(2006, 12, 5),
                Sex = 'F'
            });
            friend.Add(new Friend()
            {
                Id = 8,
                PhotoPath = "Mukuro_Rokudo.png",
                UserEmail = "correo1@example.com",
                FirstName = "Mukuro",
                LastName = "Rokudo",
                DateOfBirth = new DateTime(2006, 6, 9),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 9,
                PhotoPath = "Jotaro_Kujo.png",
                UserEmail = "correo1@example.com",
                FirstName = "Jotaro",
                LastName = "Kujo",
                DateOfBirth = new DateTime(1970, 6, 21),
                Sex = 'M'
            });
            friend.Add(new Friend()
            {
                Id = 10,
                PhotoPath = "Joseph_Joestar.png",
                UserEmail = "correo1@example.com",
                FirstName = "Joseph",
                LastName = "Joestar",
                DateOfBirth = new DateTime(1959, 4, 4),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 11,
                PhotoPath = "Mohammed_Avdol.png",
                UserEmail = "correo1@example.com",
                FirstName = "Mohammed",
                LastName = "Avdol",
                DateOfBirth = new DateTime(1999, 1, 16),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 12,
                PhotoPath = "Noriaki_Kakyoin.png",
                UserEmail = "correo1@example.com",
                FirstName = "Noriaki",
                LastName = "Kakyoin",
                DateOfBirth = new DateTime(1998, 9, 20),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 13,
                PhotoPath = "JeanPierre_Polnareff.png",
                UserEmail = "correo1@example.com",
                FirstName = "Jean Pierre",
                LastName = "Polnareff",
                DateOfBirth = new DateTime(1979, 12, 7),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 14,
                PhotoPath = "Giorno_Giovanna.png",
                UserEmail = "correo1@example.com",
                FirstName = "Giorno",
                LastName = "Giovanna",
                DateOfBirth = new DateTime(1996, 4, 16),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 15,
                PhotoPath = "Jolyne_Cujoh.png",
                UserEmail = "correo1@example.com",
                FirstName = "Jolyne",
                LastName = "Cujoh",
                DateOfBirth = new DateTime(1995, 2, 20),
                Sex = 'F'
            });

            friend.Add(new Friend()
            {
                Id = 16,
                PhotoPath = "Enrico_Pucci.png",
                UserEmail = "correo1@example.com",
                FirstName = "Enrico",
                LastName = "Pucci",
                DateOfBirth = new DateTime(1972, 5, 5),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 17,
                PhotoPath = "Robert_Speedwagon.png",
                UserEmail = "correo1@example.com",
                FirstName = "Robert E.O.",
                LastName = "Speedwagon",
                DateOfBirth = new DateTime(1963, 10, 16),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 18,
                PhotoPath = "Dio_Brando.png",
                UserEmail = "correo1@example.com",
                FirstName = "Dio",
                LastName = "Brando",
                DateOfBirth = new DateTime(1988, 6, 8),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 19,
                PhotoPath = "Caesar_Zeppeli.png",
                UserEmail = "correo1@example.com",
                FirstName = "Caesar Antonio",
                LastName = "Zeppelli",
                DateOfBirth = new DateTime(1959, 5, 13),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 20,
                PhotoPath = "Bruce_Wayne.png",
                UserEmail = "correo1@example.com",
                FirstName = "Bruce",
                LastName = "Wayne",
                DateOfBirth = new DateTime(1975, 4, 7),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 21,
                PhotoPath = "Dick_Grayson.png",
                UserEmail = "correo1@example.com",
                FirstName = "Dick",
                LastName = "Grayson",
                DateOfBirth = new DateTime(1996, 12, 1),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 22,
                PhotoPath = "Jason_Todd.png",
                UserEmail = "correo1@example.com",
                FirstName = "Jason",
                LastName = "Todd",
                DateOfBirth = new DateTime(1998, 8, 16),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 23,
                PhotoPath = "Tim_Drake.png",
                UserEmail = "correo1@example.com",
                FirstName = "Tim",
                LastName = "Drake",
                DateOfBirth = new DateTime(2000, 6, 19),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 24,
                PhotoPath = "Damian_Wayne.png",
                UserEmail = "correo1@example.com",
                FirstName = "Damian",
                LastName = "Wayne",
                DateOfBirth = new DateTime(2003, 4, 3),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 25,
                PhotoPath = "Barbara_Gordon.png",
                UserEmail = "correo1@example.com",
                FirstName = "Barbara",
                LastName = "Gordon",
                DateOfBirth = new DateTime(1998, 9, 23),
                Sex = 'F'
            });

            friend.Add(new Friend()
            {
                Id = 26,
                PhotoPath = "Diana_Prince.png",
                UserEmail = "correo1@example.com",
                FirstName = "Diana",
                LastName = "Prince",
                DateOfBirth = new DateTime(1977, 3, 22),
                Sex = 'F'
            });

            friend.Add(new Friend()
            {
                Id = 27,
                PhotoPath = "Barry_Allen.png",
                UserEmail = "correo1@example.com",
                FirstName = "Barry",
                LastName = "Allen",
                DateOfBirth = new DateTime(1989, 3, 14),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 28,
                PhotoPath = "Peter_Parker.png",
                UserEmail = "correo1@example.com",
                FirstName = "Peter",
                LastName = "Parker",
                DateOfBirth = new DateTime(2001, 8, 10),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 29,
                PhotoPath = "Miles_Morales.png",
                UserEmail = "correo1@example.com",
                FirstName = "Miles",
                LastName = "Morales",
                DateOfBirth = new DateTime(2006, 11, 7),
                Sex = 'M'
            });

            friend.Add(new Friend()
            {
                Id = 30,
                PhotoPath = "Gwen_Stacy.png",
                UserEmail = "correo1@example.com",
                FirstName = "Gwen",
                LastName = "Stacy",
                DateOfBirth = new DateTime(2006, 2, 4),
                Sex = 'M'
            });
            return friend;
        }


        }
    }
