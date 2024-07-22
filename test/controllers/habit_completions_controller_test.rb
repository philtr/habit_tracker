require "test_helper"

class HabitCompletionsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get habit_completions_create_url
    assert_response :success
  end

  test "should get destroy" do
    get habit_completions_destroy_url
    assert_response :success
  end
end
