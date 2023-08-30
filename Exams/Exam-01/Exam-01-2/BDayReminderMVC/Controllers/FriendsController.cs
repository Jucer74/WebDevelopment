using BDayReminderMVC.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BDayReminderMVC.Controllers
{
    public class FriendsController : Controller
    {
        private static List<Friend> friendsList = LoadFriends();
        // GET: FriendsController
        public ActionResult Index()
        {
            return View(friendsList);
        }

        // GET: FriendsController/Details/5
        public ActionResult Details(int id)
        {
            var friends = friendsList.Find(friend => friend.Id == id);
            return View();
        }

        // GET: FriendsController/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: FriendsController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(Friend friends)
        {
            try
            {
                friendsList.Add(friends);
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FriendsController/Edit/5
        public ActionResult Edit(int id)
        {
            var Friend = friendsList.Find(friend => friend.Id == id);
            return View(Friend);
        }

        // POST: FriendsController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, Friend friend)
        {
            try
            {
                var editFriend = friendsList.FirstOrDefault(friend => friend.Id == id);

                if (editFriend != null)
                {
                    var index = friendsList.IndexOf(editFriend);
                    friendsList[index] = friend;
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: FriendsController/Delete/5
        public ActionResult Delete(int id)
        {
            var Friend = friendsList.Find(friend => friend.Id == id);
            return View();
        }

        // POST: FriendsController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                var Remove = friendsList.FirstOrDefault(friend => friend.Id == id);

                if(Remove != null)
                {
                    friendsList.Remove(Remove);
                }

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        public static List<Friend> LoadFriends()
        {
            var friends = new List<Friend>();
            return friends;
        }
    }
}
