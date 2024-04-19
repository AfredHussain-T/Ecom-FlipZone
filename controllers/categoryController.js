import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";

export const createCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.status(401).send({message:'Name is required'});
        }
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(200).send({
                success:true,
                message:'category already exist'
            });
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success:true,
            message:'New Category Created',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: "Error in category"
        })
    }
};

export const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)},{new:true})
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in updating category'
        })
    }
};


export const categoryController = async (req, res) => {
    try {
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message:'All Categories Are Fetched',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while fetching categories',
            error
        })
    }
};


// single category contrroller

export const singleCategoryController = async (req, res) => {
    try {
        const {slug} = req.params;
        const category = await categoryModel.findOne({slug});
        res.status(200).send({
            success:true,
            message:'Fetched Required Category',
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
            message:'Error while fetching category',
            success:false
        });
    }
};

// delete category
export const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:'Deleted Category'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error,
            message:'Error while delete category',
            success:false
        });
    }
}