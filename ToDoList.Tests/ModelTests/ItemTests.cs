using Microsoft.VisualStudio.TestTools.UnitTesting;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using ToDoList.Models;
using System;

namespace ToDoList.Tests
{

  [TestClass]
  public class ItemTests : IDisposable
  {

    public IConfiguration Configuration { get; set; }

    public void Dispose()
    {
      Item.ClearAll();
    }

    public ItemTests()
    {
      IConfigurationBuilder builder = new ConfigurationBuilder()
          .AddJsonFile("appsettings.json");
      Configuration = builder.Build();
      //says that tests are connected to test DB not dev DB
      DBConfiguration.ConnectionString = Configuration["ConnectionStrings:TestConnection"];
    }
    [TestMethod]
    public void ReferenceTypes_ReturnsTrueBecauseBothItemsAreSameReference_bool()
    {
      // Arrange, Act
      Item firstItem = new Item("Mow the lawn");
      Item copyOfFirstItem = firstItem;
      copyOfFirstItem.Description = "Learn about C#";

      // Assert
      Assert.AreEqual(firstItem.Description, copyOfFirstItem.Description);
    }

    [TestMethod]
    public void ValueTypes_ReturnsTrueBecauseValuesAreTheSame_Bool()
    {
      // Arrange, Act
      int test1 = 1;
      int test2 = 1;

      // Assert
      Assert.AreEqual(test1, test2);
    }

    public override bool Equals(System.Object otherItem)
    {
      if (!(otherItem is Item))
      {
        return false;
      }
      else
      {
        Item newItem = (Item)otherItem;
        bool descriptionEquality = (this.Description == newItem.Description);
        return descriptionEquality;
      }
    }
    public override int GetHashCode()//tell compiler to generate hash code for Item based on the value of the Item's Id property
    {
      return Id.GetHashCode();
    }
    public void Save()
    {
      MySqlConnection conn = new MySqlConnection(DBConfiguration.ConnectionString);
        conn.Open();

        MySqlCommand cmd = conn.CreateCommand() as MySqlCommand;
        //pass in parameter placeholder
        cmd.CommandText = "INSERT INTO items(description) VALUES (@ItemDescription);";
        MySqlParameter param = new MySqlParameter();
        param.ParameterName = "@ItemDescription";
        param.Value = this.Description;
        cmd.Parameters.Add(param);
        cmd.ExecuteNonQuery();
        if (conn != null)
        {
          conn.Dispose();
        }
    }
    [TestMethod]
    public void Save_SavesToDAtabase_ItemList()
    {
      Item testItem = new Item("mow the lawn");
  // instantiate new item, then save it to database
      testItem.Save();
      List<Item> result = Item.GetAll();
      List<Item> testList = new List<Item>{testItem};
      CollectionAssert.AreEqual(testList, result);
    }


    // [TestMethod]
    // public void ItemConstructor_CreatesInstanceOfItem_Item()
    // {
    //   Item newItem = new Item("test");
    //   Assert.AreEqual(typeof(Item), newItem.GetType());
    // }

    // [TestMethod]
    // public void GetDescription_ReturnsDescription_String()
    // {
    //   //Arrange
    //   string description = "Walk the dog.";

    //   //Act
    //   Item newItem = new Item(description);
    //   string result = newItem.Description;

    //   //Assert
    //   Assert.AreEqual(description, result);
    // }

    // [TestMethod]
    // public void SetDescription_SetDescription_String()
    // {
    //   //Arrange
    //   string description = "Walk the dog.";
    //   Item newItem = new Item(description);

    //   //Act
    //   string updatedDescription = "Do the dishes";
    //   newItem.Description = updatedDescription;
    //   string result = newItem.Description;

    //   //Assert
    //   Assert.AreEqual(updatedDescription, result);
    // }

    [TestMethod]
    public void GetAll_ReturnsEmptyList_ItemList()
    {
      // Arrange
      List<Item> newList = new List<Item> { };

      // Act
      List<Item> result = Item.GetAll();

      // Assert
      CollectionAssert.AreEqual(newList, result);
    }

    [TestMethod]
    public void GetAll_ReturnsItems_ItemList()
    {
      //Arrange
      string description01 = "Walk the dog";
      string description02 = "Wash the dishes";
      Item newItem1 = new Item(description01);
      newItem1.Save();
      Item newItem2 = new Item(description02);
      newItem2.Save();
      List<Item> newList = new List<Item> { newItem1, newItem2 };

      //Act
      List<Item> result = Item.GetAll();

      //Assert
      CollectionAssert.AreEqual(newList, result);
    }

    [TestMethod]
    public void Equals_ReturnsTrueIfDescriptionsAreTheSame_Item()
    {
      // Arrange, Act
      Item firstItem = new Item("Mow the lawn");
      Item secondItem = new Item("Mow the lawn");

      // Assert
      Assert.AreEqual(firstItem, secondItem);
    }

    [TestMethod]
    public void Save_SavesToDatabase_ItemList()
    {
      //Arrange
      Item testItem = new Item("Mow the lawn");

      //Act
      testItem.Save();
      List<Item> result = Item.GetAll();
      List<Item> testList = new List<Item> { testItem };

      //Assert
      CollectionAssert.AreEqual(testList, result);
    }

    [TestMethod]
    public void Find_ReturnsCorrectItemFromDatabase_Item()
    {
      //Arrange
      Item newItem = new Item("Mow the lawn");
      newItem.Save();
      Item newItem2 = new Item("Wash dishes");
      newItem2.Save();

      //Act
      Item foundItem = Item.Find(newItem.Id);
      //Assert
      Assert.AreEqual(newItem, foundItem);
    }
  }
}
