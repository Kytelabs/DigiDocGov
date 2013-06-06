require 'test_helper'

class DatavaluesControllerTest < ActionController::TestCase
  setup do
    @datavalue = datavalues(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:datavalues)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create datavalue" do
    assert_difference('Datavalue.count') do
      post :create, datavalue: { fieldType: @datavalue.fieldType, name: @datavalue.name, value: @datavalue.value }
    end

    assert_redirected_to datavalue_path(assigns(:datavalue))
  end

  test "should show datavalue" do
    get :show, id: @datavalue
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @datavalue
    assert_response :success
  end

  test "should update datavalue" do
    put :update, id: @datavalue, datavalue: { fieldType: @datavalue.fieldType, name: @datavalue.name, value: @datavalue.value }
    assert_redirected_to datavalue_path(assigns(:datavalue))
  end

  test "should destroy datavalue" do
    assert_difference('Datavalue.count', -1) do
      delete :destroy, id: @datavalue
    end

    assert_redirected_to datavalues_path
  end
end
